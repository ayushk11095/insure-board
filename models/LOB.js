const mongoose = require('mongoose');

const LOBSchema = new mongoose.Schema({
    categoryName: String
});

const LOB = mongoose.model('LOB', LOBSchema);
module.exports = LOB;