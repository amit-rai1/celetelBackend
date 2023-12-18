import mongoose from "mongoose";
const { Schema } = mongoose;

const subUserSchema = new mongoose.Schema({

  permissions: {
    type: Schema.Types.ObjectId,
    ref: 'Permission',
  },

  first_name: {
    type: String,
    // required: true
  },
  last_name: {
    type: String,
    // required: true
  },

  // email: {
  //   type: String,

  //   unique: true
  // },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  Phone: {
    type: String,
    // required: true
  },
  role: {
    type: String,
    // required: true,
    enum: ['subuser'], // Define allowed roles
  },

});


const subUserModel = mongoose.model("subUserModel", subUserSchema);

export default subUserModel;