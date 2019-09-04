//definition which file has to be used for dev and prod environment
if (process.env.NODE_ENV === 'production') {
    //case prod use prod.js keys
    module.exports = require('./prod');
} else {
    //case dev use dev.js keys
    module.exports = require('./dev');
};