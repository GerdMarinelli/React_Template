//External imports
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//router.use(express.json());

//Route to the registration form
router.get('/register', function (req, res) {
    res.render('register');
});

//Route to the login form
router.get('/login', function (req, res) {
    res.render('login');
});

//Route to the user registration process
router.post('/register', [
    //input validation with ExpressValidator functionality
    body('name').not().isEmpty().withMessage('Your name is required'),
    body('email').not().isEmpty().withMessage('Your eMail is required')
        .isEmail().withMessage('Please enter a valid eMail')
        .normalizeEmail(),
    body('username').not().isEmpty().withMessage('Your username is required'),
    body('password').not().isEmpty().withMessage('Your password is required')
        .not().isIn(['123', 'abc', 'password', 'god']).withMessage('Do not use a common word as the password')
        .isLength({ min: 8 }).withMessage('Your password has not at least 8 characters')
        .matches(/\d/).withMessage('A number in your password is missing'),
    body('password2').not().isEmpty().withMessage('Please confirm your password')
        .custom((value, { req }) => value === req.body.password).withMessage('Password confirmation did not match your password'),
(req, res) => {
    //variables definition for the user's input
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    //test if it's working
    //console.log(name);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //console.log(util.inspect(errors.array({ onlyFirstError: true })));
        //for testing
        //return res.status(422).json({ errors: errors.array() });
            res.render('register', {
                errors: errors.array({ onlyFirstError: true })
            });
        } else {
            req.flash('success_msg', 'You are registered and now can login');
            res.redirect('/users/login');
        }
}]);

module.exports = router;