import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({

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
    enum: ['user'], // Define allowed roles
  },

});


const userModel = mongoose.model("userModel", userSchema);

export default userModel;