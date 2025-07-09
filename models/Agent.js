const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Agent = mongoose.model('Agent', AgentSchema);
module.exports = Agent;