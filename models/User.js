//External imports
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

//definition of the user object data model
const userSchema = new Schema({
    googleId: String,
    facebookId: String,
    username: String,
    password: String,
    email: String,
    name: String,
    //default value is set to 0
    credits: { type: Number, default: 0 }
});
//definition of the users object's name
const users = module.exports = mongoose.model('users', userSchema);

//new user creation for local auth --> code from bcrypt npm docu
module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}