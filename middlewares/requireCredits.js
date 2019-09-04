//definition of a middleware, that could be used in several cases and making it accessible to other files
//handling requests, responses and the next statement
module.exports = (req, res, next) => {
    //if not enough credits
    if (req.user.credits < 1) {
        //create an error status with additional explanation
        return res.status(403).send({ error: 'Not enough credits' });
    }
    //if enough credits, then go on
    next();
};