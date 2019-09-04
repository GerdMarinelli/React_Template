//External import
var localtunnel = require('localtunnel');

//Setup of the localtunnel middleware to build a connection between external API-providers and our internal inofficial dev environment
localtunnel(5000, {
    //subdomain from localtunnel for this purpose
    subdomain: 'gerdmarinellisurvey' }, function(err, tunnel) {
        //when tunnel is running, then send a log to the console
        console.log('LT running')
    });