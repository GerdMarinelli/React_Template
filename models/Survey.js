//External imports
const mongoose = require('mongoose'); //middleware to handle mongoDB requests
const { Schema } = mongoose; //function of mongoose to define a DB object

//Internal imports
const RecipientSchema = require('./Recipient');

//definition of the survey object data model
const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    //recipients as SubDoc in the survey model --> doc-limit is 4 MB in MongoDB!
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    //_user is the connection to the users collection
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastResponded: Date
});
//definition of the surveys object's name
mongoose.model('surveys', surveySchema);