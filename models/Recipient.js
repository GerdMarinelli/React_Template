//External imports
const mongoose = require('mongoose');
const { Schema } = mongoose;

//definition of the recipients object data model
const recipientSchema = new Schema({
    email: String,
    //default value is set to false
    responded: { type: Boolean, default: false }
});
//make the data model accessible to other object data models (in this case: to the surveys object data model)
//no object's name definition because data model is not used outside the surveys data model object
module.exports = recipientSchema;