const mongoose = require('mongoose');

const senderSchema = new mongoose.Schema({
  SenderID: String,
  // deleted: {
  //   type: Boolean,
  //   default: false
  // },
  // deletedAt: Date
});

const senderid = mongoose.model('senderid', senderSchema);

module.exports = senderid;
