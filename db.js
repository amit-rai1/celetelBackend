// import mongoose from "mongoose";

// const config = require("./config")
// import 'dotenv/config'
// console.log(process.env.Node_env)
// const configvalue = config.get(process.env.Node_env);
// const DB = configvalue["DB"];

// var options = {
//     user: DB.UserName,
//     pass: DB.Password,
// }
// // const MONGOURI= `mongodb://${DB.HOST}:${DB.PORT}/${DB.DATABASE}`
// const MONGOURI= `mongodb+srv:///Ibizo:4dokany9XdfIlwSG@cluster0.1osvxxb.mongodb.net/?retryWrites=true&w=majority}`

// console.log(MONGOURI,"MONGOURI")
// export const mongoconnection = async()=>{
//     try{
//         await mongoose.connect(MONGOURI,options);
//         console.log("Connected to DB");
//     } catch(e){
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

const MONGOURI= `mongodb+srv://Ibizo:4dokany9XdfIlwSG@cluster0.1osvxxb.mongodb.net/?retryWrites=true&w=majority`

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
