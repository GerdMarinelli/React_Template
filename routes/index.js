//External imports
const express = require('express');
const router = express.Router();

//Route to the domain
router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;