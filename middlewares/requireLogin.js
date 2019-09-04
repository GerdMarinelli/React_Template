//definition of a middleware, that could be used in several cases and making it accessible to other files
//handling requests, responses and the next statement
module.exports = (req, res, next) => {
    //if there is no request user data available
    if (!req.user) {
        //create an error status with additional explanation
        //401 = unauthorized or forbidden to access
        return res.status(401).send({ error: 'You have to be logged in' });
    }
    //if user data is available, then go on
    next();
};