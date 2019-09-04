//External imports
const proxy = require('http-proxy-middleware');

//definition of proxy to make the Express servers API routes accessible
module.exports = function (app) {
    //authorization route
    app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
    //all other servey functionality routes
    app.use(proxy('/api/**', { target: 'http://localhost:5000' }));
};
