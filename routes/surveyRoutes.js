//External imports
const _ = require('lodash');//middleware for handling data
const Path = require('path-parser');//middleware for pulling out parts of an URL path and mapping them to variables
const { URL } = require('url'); //standard module in node.js helping us parsing and de-/re-structuring URL strings
const mongoose = require('mongoose');//middleware for making mongoDB requests

//Internal imports
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys'); 

module.exports = (app) => {
    //creation of the list of surveys a user has executed
    //ensure that user is logged in with the imported requireLogin() function
    app.get('/api/surveys', requireLogin, async (req, res) => {
        //fetching existing surveys data out of mongoDB created by the current user
        //DB request: find all serveys in mongoDB that equal the id of the current user's request object and put them into the surveys variable
        //because it's an asynchronous action we have to add te async await syntax
        const surveys = await Survey.find({ _user: req.user.id })
            //we have to take care, that not the whole surveys' objects are transferred between mongoDB, Express server and the client, because they can be very huge!!!
            //solution is to only request the required summarized information we wand to display on the screen and not at all details of the huge recipients object
            .select({ recipients: false });
        //reponse to the request
        res.send(surveys);
    });

    //creation of the recipient's feedback route (thanks for giving us response or similar)
    //app.get('/api/surveys/thanks', (req, res) => {
    //update the line above with personalized route
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        //content of the route
        res.send('Thanks for giving us your feedback');
    });

    //Test-route-handler for testing webhooks from SendGrid
    //no use of async await syntax because SendGrid is not really waiting for a response for their webhooks
    app.post('/api/surveys/webhooks', (req, res) => {
        /*
        //looking if the request receives a body and what's in there
        //console.log(req.body);
        //sending back an empty object that can be refilled then as close-up message to SendGrid
        //res.send({});
        //map-over the list of received events fron SendGrid
        //lodash function map() iterating over the request objects body object
        const events = _.map(req.body, (event) => {
            //extracting the route of the URL path (all after the domain)
            const pathname = new URL(event.url).pathname;
            //pulling out the survey ID and the choice of the route from above just setting the : and a variable name
            const p = new Path('/api/surveys/:surveyId/:choice');
            //testing the result of the extraction
            //console.log(p.test(pathname));
            //result is the above defined pair of variables, if one or both variables are missing no result object will be created
            const match = p.test(pathname);
            //when a match is found
            if (match) {
                //return an object with surveyId and choice out of the p object "and" the email out of the event object
                return { email: event.email, surveyId: match.surveyId, choice: match.choice };
            }
        });
        //testing the returning events object
        //console.log(events);
        //remove any undefined records caused by some delivered object elements that are not required for this case
        //lodash function which eliminates all result objects with undefined return
        const compactEvents = _.compact(events);
        //remove duplicate records caused by several times responding to a survey email
        //lodash function which looks on the elements defined after the object
        //definition here is: email "and" surveyId have to be identical in two or more objects to be removed
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
        //testing the returning uniqueEvents object
        console.log(uniqueEvents);
        //tell SendGrid with an empty object that response is received to not resend a response several more times
        res.send({});
        */
        //condensing the code above with lodash chain helper to avoid creating several objects like events, compactEvents and uniqueEvents and their repetitive sytnax:
        //pulling out the survey ID and the choice of the route from above just setting the : and a variable name
        //putting the p object out of the events object to not create it with every new events object iteration
        const p = new Path('/api/surveys/:surveyId/:choice');
        //new chain helper from lodash with new created events object used for testing below
        //const events = _.chain(req.body)
        //deleting the events object after testing and just executing the pure chain
        _.chain(req.body)
            //iterating over the request objects body object
            .map((event) => {
                //deleting the extra pathname variable and defining it directly in the match variable
                //pulling out the survey ID and the choice of the route from above just setting the : and a variable name
                //result is the above defined pair of variables, if one or both variables are missing no result object will be created
                const match = p.test(new URL(event.url).pathname);
                //when a match is found
                if (match) {
                    //return an object with surveyId and choice out of the p object "and" the email out of the event object
                    return { email: event.email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            //remove any undefined records caused by some delivered object elements that are not required for this case
            //lodash function which eliminates all result objects with undefined return
            .compact()
            //remove duplicate records caused by several times responding to a survey email
            //lodash function which looks on the elements defined after the object
            //definition here is: email "and" surveyId have to be identical in two or more objects to be removed
            .uniqBy('email', 'surveyId')
            //save the vote to mongoDB for every unique SendGrid response object with the elements surveyId, email and choice
            .each(({ surveyId, email, choice }) => {
                //keep care to not execute any operations in the express server or the client, but to keep inside the mongoDB to not cause heavy data traffic!!!
                //mongoose update-request handeled inside the mongoDB
                //first object describes the request to mongoDB
                //mongoose function updateOne() and all included definitions searches and updates exactly one record "inside" the mongoDB infrastructure, no data traffic between mongoDB and Express!
                Survey.updateOne({
                    //if mongoDB _id is same as the surveyId of the SendGrid response object
                    _id: surveyId,
                    //if one of the recipients in the survey object
                    recipients: {
                        //equals the email of the SendGrid response object "and" has not yet responded
                        //the $elemMatch is a mongoDB operator for searching matching elements
                        $elemMatch: { email: email, responded: false }
                    }
                },
                //second object describes the the update response to mongoDB
                {
                    //since choice yes or no cannot be predefined the complete choice is described with the mongoDB $inc operator and the yes "or" no gets the value 1 for voted 
                    $inc: { [choice]: 1 },
                    //set the responded to true with the mongoDB $set operator
                    //.$. represents the $elemMatch for the appropriate recipient in the whole recipients list for this survey
                    $set: { 'recipients.$.responded': true },
                    //set the respond date
                    lastResponded: new Date()
                //execution of the DB operation
                }).exec();
            })

            //don't forget the additional value() function in a chain to return the result
            .value();
        //testing the returning events object
        //console.log(events);
        //tell SendGrid with an empty object that response is received to not resend a response several more times
        res.send({});
    });

    //creation of a new survey
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        //fetch some necessary attributes out of the request body
        const { title, subject, body, recipients } = req.body;
        //initialize a new servey and link the content to the request body attributes
        const survey = new Survey({
                title: title,
                subject: subject,
                body: body,
                //take the array of recipients, split them by ",", map every recipient to a new object with only the email adress and trim all empty spaces in front and behind the emáil
                recipients: recipients.split(',').map(email => { return { email: email.trim() } }),
                //map the current userid from MongoDB to the survey creator
                _user: req.user.id,
                //map the current date to the dateSent attribute
                dateSent: Date.now()
        });
        //initialize a new email and link it to the survey and template (rendering) content
        const mailer = new Mailer(survey, surveyTemplate(survey));
        //send out command after mails were sucessfully created
        try {
            //send mails after POST request was executed in Mailer.js
            await mailer.send();
            //save the object in DB
            await survey.save();
            //reduction of credits
            req.user.credits -= 1;
            //fetch user and save the user to the survey document
            //update the user model because of reduced credits
            const user = await req.user.save();
            //Header gets automatically updated because the FETCH_USER action type gets rerendered after every user model update
            res.send(user);
        //catch error messages from SendGrid
        } catch (err) {
            //forward error message to the user's browser
            res.status(422).send(err);
        }
    });
};