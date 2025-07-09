const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    dob: Date,
    address: String,
    phoneNumber: String,
    state: String,
    zipCode: String,
    email: { type: String, required: true, unique: true },
    gender: String,
    userType: String
});

const User = mongoose.model('User', UserSchema);
module.exports = User;