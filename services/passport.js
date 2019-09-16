//External imports
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');

//Internal imports
const User = mongoose.model('users');
const keys = require('../config/keys');

//identification of a user before execution of some auth strategy
passport.serializeUser((user, done) => {
    //identify user object with user id
    done(null, user.id);
});
//handling of a user after no identification is any more necessary
passport.deserializeUser((id, done) => {
    //identify the current user
    User.findById(id)
        //delete the user id out of the user object
        .then(user => {
            done(null, user);
        })
});

//definition of the Google Auth Strategy
passport.use(new GoogleStrategy({
    //call the software provider's Google API credentials
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    //definition of the callback path for communication between Google and the software
    callbackURL: "/auth/google/callback",
    //some passport functionality
    proxy: true
},
    //if our developer's autehentication is passed succesfully, we take the Google's accessToken, refreshToken, some user profile's infos and the done statement
    async (accessToken, refreshToken, profile, done) => {
        //console.log('access token', accessToken);
        //console.log('refresh token', refreshToken);
        //console.log('profile', profile);
        //definition of a user logged in by Google Auth 2.0
        const existingUser = await User.findOne({ googleId: profile.id })
        //if user already exists, then just use the existing user
        if (existingUser) {
            done(null, existingUser);
        } else {
            //if user is not existing, then create a new user and save it
            const user = await new User({ googleId: profile.id }).save();
            //send the done statement to google that they can terminate the process
            done(null, user);
        }
    }
));

//definition of Facebook Auth Strategy
passport.use(new FacebookStrategy({
	//call the software provider's Facebook API credentials
	clientID: keys.facebookClientID,
	clientSecret: keys.facebookClientSecret,
	//definition of the callback path for communication between Facebook and the software
	callbackURL: keys.facebookCallbackURL
	//some passport functionality
	//proxy: true
},
	//if our developer's autehentication is passed succesfully, we take the Facebook's accessToken, refreshToken, some user profile's infos and the done statement
	async (accessToken, refreshToken, profile, done) => {
		//console.log('access token', accessToken);
        //console.log('refresh token', refreshToken);
        //console.log('profile', profile);
        //definition of a user logged in by Facebook Auth
		const existingUser = await User.findOne({ facebookId: profile.id })
        //if user already exists, then just use the existing user
        if (existingUser) {
            done(null, existingUser);
        } else {
            //if user is not existing, then create a new user and save it
            const user = await new User({ facebookId: profile.id }).save();
            //send the done statement to google that they can terminate the process
            done(null, user);
        }
	}
));