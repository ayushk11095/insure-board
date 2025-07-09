const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    policyNumber: String,
    policyStartDate: Date,
    policyEndDate: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'LOB', required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier', required: true },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true }
});

const Policy = mongoose.model('Policy', PolicySchema);
module.exports = Policy;