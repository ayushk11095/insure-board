const mongoose = require('mongoose');

const CarrierSchema = new mongoose.Schema({
    companyName: String
});

const Carrier = mongoose.model('Carrier', CarrierSchema);
module.exports = Carrier;
  