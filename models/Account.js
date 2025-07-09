const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    accountName: String
});

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;