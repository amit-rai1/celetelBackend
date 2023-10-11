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
     
      email: {
        type: String,
        
        unique: true
      },
      username: {
        type: String,
        
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
        enum: ['client'], // Define allowed roles
      },
    });
    

const client = mongoose.model("client", userSchema);

export default client;