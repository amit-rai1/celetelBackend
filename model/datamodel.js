const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  MSISDN: String,
  SIM_Number: String,
  Circle: String,
  Operators:String,
  Status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});

const datamodel = mongoose.model('datamodel', dataSchema);

module.exports = datamodel;
