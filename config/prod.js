//prod environment keys
//all keys are stored in application provider's server env variables (Heroku) with same naming as defined in this file
module.exports = {
    //Google authorisation
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	//Facebook authorization
	facebookClientID: process.env.FACEBOOK_CLIENT_ID,
	facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
	facebookCallbackURL: process.env.FACEBOOK_CALLBACK_URL,
    //MongoDB
    mongoURI: process.env.MONGO_URI,
    //encryption key for cookies
    cookieKey: process.env.COOKIE_KEY,
    //Stripe (payment provider)
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    //SendGrid (email provider)
    sendGridKey: process.env.SENDGRID_KEY,
    //Domain definition for prod environment
    redirectDomain: process.env.REDIRECT_DOMAIN
};