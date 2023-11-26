const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  MSISDN: String,
  SIM_Number: String,
  Circle: String,
  Machine_No:String,
  Operators: String,
  Status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date // Use Number type for timestamp
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

const datamodel = mongoose.model('datamodel', dataSchema);

module.exports = datamodel;
