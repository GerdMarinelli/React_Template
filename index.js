//External imports
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');

//Internal imports
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

//inizializing the mongoDB with our credentials
mongoose.connect(keys.mongoURI);
const db = mongoose.connection;

//initializing that our app object is running with Express
const app = express();

//initializing the server-side rendering engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

//initializing that we are using the body- and cookie-parser middleware in our app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

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

//definition of a server-side static folder for all the server-side rendering stuff
app.use(express.static(path.join(__dirname, 'public')));

//initializing the express cookie system
app.use(session({
    secret: [keys.cookieKey],
    saveUninitialized: true,
    resave: true
}));

//initializing the Connect Flash middleware for executing messages from the server to the client
app.use(flash());
//global variables for flash messages
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    //this variable is to handle the express defined error variable to a flash message
    res.locals.error = req.flash('error');
    next();
});

//Passport inizialization
app.use(passport.initialize());
app.use(passport.session());

//routes definition for this app
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
const routes = require('./routes/index');
const users = require('./routes/users');
app.use('/', routes);
app.use('/users', users);

//definition that in production
if (process.env.NODE_ENV === 'production') {
    //software is using the deployed build in this defined folder
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//web app server port definition: get it from the web-app provider's env variable or set port to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));