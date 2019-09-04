//External imports
const sendgrid = require('sendgrid');

//Internal imports
const keys = require('../config/keys');

//Creation of a variable to easier access the Sendgrid helper functions
const helper = sendgrid.mail;

//extend SendGrids Mail-class with own stuff
//predefined functionality comes from the SendGrid's packages, not from React or Express!
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        //Mailer-Setup as described in SendGrid-API
        super();
        //Definition of the SendGrid object by adding our key
        this.sgApi = sendgrid(keys.sendGridKey);
        //Mailer-Setup as described in SendGrid-API
        this.from_email = new helper.Email('gerd.marinelli@live.de'); //hard coded email only for testing
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        //own helper method formatAddresses as defined below
        this.recipients = this.formatAddresses(recipients);
        //registry of the body content to the email - addContent is a SendGrid predefined helper method
        this.addContent(this.body);
        //own helper method for activation of Click-Tracking as defined below
        this.addClickTracking();
        //own helper method for adding helper recipients objects from formatAddresses to the campaign as defined below
        this.addRecipients();
    }
    //fetch the email adress string out of the recipients objects served from the survey object (in surveyRoutes.js)
    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }
    //take SendGrid functions to variables and bring them into another SendGrid function
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);
        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }
    //take SendGrid function to a variable, iterate through the recipients and add the info to be able to recognize feedback afterwards
    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }
    //Execution of the constructor stuff above in a new POST request
    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
        //Creation of a response object after completed POST request execution
        const response = await this.sgApi.API(request);
        //feedback result for further use when this whole stuff was executed
        return response;
    }
}
//Make Mailer service available to other files
module.exports = Mailer;