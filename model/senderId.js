const mongoose = require('mongoose');

const senderSchema = new mongoose.Schema({

  SenderID: String,
  
});

const senderid = mongoose.model('senderid', senderSchema);

module.exports = senderid;
