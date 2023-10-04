const mongoose = require('mongoose');

const distributedDataSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  data: [{
    firstname: String,
    lastname: String,
    Address: String,
    State: String,
    City: String,
    Homephone: String,
    Email: String,
    Zip: String,
    Dateofbirth: Date
  }],
  desiredData:{
    type:String
  },
  usedData: [Object], // Define as an array of objects
  unusedData: [Object], // Define as an array of objects
  
});

const DistributedData = mongoose.model('DistributedData', distributedDataSchema);

module.exports = DistributedData;



// const mongoose = require('mongoose');

// const usedDataSchema = new mongoose.Schema({
//   data: [{ 
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     data: [{
//       firstname: String,
//       lastname: String,
//       Address: String,
//       State: String,
//       City: String,
//       Homephone: String,
//       Email: String,
//       Zip: String,
//       Dateofbirth: Date
//     }],
//     desiredData: String,
//     usedData: String,
//     unusedData: String
//   }]
// });

// const UnusedDataSchema = new mongoose.Schema({
//   data: [{
//     // Define the structure of your unused data
//   }]
// });

// const UsedData = mongoose.model('UsedData', usedDataSchema);
// const UnusedData = mongoose.model('UnusedData', UnusedDataSchema);

// module.exports = { UsedData, UnusedData };
