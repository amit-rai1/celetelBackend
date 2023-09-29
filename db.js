// import mongoose from "mongoose";

// const config = require("./config")
// import 'dotenv/config'
// console.log(process.env.Node_env)
// const configvalue = config.get(process.env.Node_env);
// const DB = configvalue["DB"];
// console.log(DB,"db");

// var options = {
//     user: DB.UserName,
//     pass: DB.Password,
// }
// const MONGOURI= `mongodb://${DB.HOST}:${DB.PORT}/${DB.DATABASE}`
// export const mongoconnection = async()=>{
//     try{
//         await mongoose.connect(MONGOURI,options);
//         console.log("Connected to DB");
//     } catch(e){
//         console.log(e);
//         throw e
//     }
// }
// import mongoose from "mongoose";
// const config = require("./config")

// import 'dotenv/config';

// const configvalue = config[process.env.Node_env];
// const DB = configvalue["DB"];

// var options = {
//     user: DB.UserName,
//     pass: DB.Password,
// }

// const MONGOURI = process.env.MONGOURI;

// export const mongoconnection = async () => {
//     try {
//         await mongoose.connect(MONGOURI, options);
//         console.log("Connected to DB");
//     } catch (e) {
//         console.log(e);
//         throw e
//     }
// }

import mongoose from "mongoose";
const config = require("./config")
import 'dotenv/config'
console.log(process.env.Node_env)
const configvalue = config.get(process.env.Node_env);
const DB = configvalue["DB"];

var options = {
    user: DB.UserName,
    pass: DB.Password,
}




const MONGOURI = process.env.MONGOURI;

console.log(MONGOURI,"MONGOURI")



export const mongoconnection = async()=>{
    try{
        await mongoose.connect(MONGOURI,options);
        console.log("Connected to DB");
    } catch(e){
        console.log(e);
        throw e
    }
}
