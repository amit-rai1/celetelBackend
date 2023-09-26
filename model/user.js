import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: true
      },
      date_of_joining: {
        type: Date,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      Phone:{
        type:String,
        required:true
      },
      role: {
        type: String,
        required: true,
        enum: ['user'], // Define allowed roles
      },
    });
    

const user = mongoose.model("user", userSchema);

export default user;