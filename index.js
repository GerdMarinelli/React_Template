//External imports
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

//Internal imports
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

//inizializing the mongoDB with our credentials
mongoose.connect(keys.mongoURI);
//initializing that our app object is running with Express
const app = express();
//initializing that we are using the body-parser middleware in our app
app.use(bodyParser.json());
//initializing that we are using the cookie-session middleware in our app
app.use(
    //cookie definition
    cookieSession({
        //30 days cookie lifetime
        maxAge: 30 * 24 * 60 * 60 * 1000,
        //where we can find the encrytion key for cookies that cookies are not stored in plain text
        keys: [keys.cookieKey]
    })
);
//Passport inizialization
app.use(passport.initialize());
app.use(passport.session());
//routes definition for this app
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
//Test-Code for some first API requests to our Express API
/*
app.get('/', (req, res) => {
    res.send({ bye: 'buddy' });
});
*/
//definition that in production
if (process.env.NODE_ENV === 'production') {
    //software is using the deployed build in this defined folder
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
//web app port definition: get it from the web-app provider's env variable or set port to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);