//External imports
const mongoose = require('mongoose');
const { Schema } = mongoose;

//definition of the user object data model
const userSchema = new Schema({
    googleId: String,
	facebookId: String,
    //default value is set to 0
    credits: { type: Number, default: 0 }
});
//definition of the users object's name
mongoose.model('users', userSchema);