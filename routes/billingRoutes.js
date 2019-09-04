//we first have to import the stripe library to the server directory with: npm install --save stripe
//we first have to import the body-parser library to the server directory with: npm install --save body-parser
//import body-parser in server index.js and add middleware-use: app.use(bodyParser.json());
//body-parser enables express to receive POST-request bodies when coming from a React frontend and create a property called body to be handled afterwards

//has to be the first import!!!
const keys = require('../config/keys');

//External imports
const stripe = require('stripe')(keys.stripeSecretKey);

//Internal imports
const requireLogin = require('../middlewares/requireLogin');

//definition of routes for API requests
module.exports = app => {
    //POST request for a charging process
    //check if logged in included to ensure user's data access
    app.post('/api/stripe', requireLogin, async (req, res) => {
        //now in requireLogin.js for reuse: above included second argument! In this way only envoked when really making the API-request, not when starting the file
        /*
        if (!req.user) {
            //401 = unauthorized or forbidden to access
            return res.status(401).send({error: 'You have to be logged in'});
        }
        */
        //console.log(req.body); // test what's comming in from the frontend
        //definition of the Stripe charge object which can be enlarged with much more additional infos
        const charge = await stripe.charges.create({
            //in this case definition is hard coded, but in production has to be replaced by variables
            amount: 500,
            currency: 'usd',
            description: '5$ for 24 months prime access',
            //req.body.id comes from the body-parser body property and id comes from the console result above
            source: req.body.id 
        });
        //console.log(charge);
        //update of the user's credits info
        req.user.credits += 5;
        //passport-functionality:
        const user = await req.user.save();
        res.send(user);
    });
};