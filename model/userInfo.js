import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },

    // address: {
    //     add_Line1: {
    //         type: String,

    //     },
    //     add_Line2: {
    //         type: String,

    //     },
    //     state: {
    //         type: String,
    
    //     },
    
    //     city: {
    //         type: String,
    
    //     },
    // },
    Address: {
        type:String,
    },
        State: {
            type: String,
    
        },
    
        City: {
            type: String,
    
        },

    Homephone: {
        type: Number,

    },

    Email: {
        type: String,

    },
    Zip:{
        type:Number,
    },
    Dateofbirth:{
        type:String,
    },

    filename: {
        type: String,
        required: true
      },
    //   numberOfFiles: {
    //     type: Number,
    //     required: true
    //   },

    usedData: {
        type: Number,
        default: 0
    },
    unusedData: {
        type: Number,
        default: 0
    }


})

const userInfo = mongoose.model("userInfo", userSchema);

export default userInfo;