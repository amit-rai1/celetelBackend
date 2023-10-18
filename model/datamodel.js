const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({

  MSISDN: String,
  SIM_Number: String,
  Circle: String,
  Operators:String,
  Status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
});

const datamodel = mongoose.model('datamodel', dataSchema);

module.exports = datamodel;
