//External imports
const passport = require('passport');

//definition of routes for API requests
module.exports = (app) => {
    //GET request for Google authentication using passport functionality
    app.get('/auth/google', passport.authenticate('google', {
        //definition of user data we want to get from Google
        scope: ['profile', 'email']
    }));
    //GET request for Google authentication using passport functionality
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            //if we get a positive user auth response object from Google, then forward to this route
            res.redirect('/surveys');
        }
    );
    //GET request to logout
    app.get('/api/logout', (req, res) => {
        req.logout();
        //after logout forward to the welcome page
        res.redirect('/');
    });
    //GET request to identify the current user
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};