
const express = require('express');
import  bodyParser  from 'body-parser';
import cors from 'cors';
// const app = require('../app').default;



import adminRoute from './route/adminRoute'
import { mongoconnection } from './db';
// import client from './model/client';
import client from './route/client'
import addData from './route/datamodel'
// import { addSenderID } from './controller/senderId';

import addSenderID from './route/senderId'

const app = express()

console.log(Date.now(),"app");

mongoconnection();
app.use(cors({origin:'*'}));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json())

app.use("/api/client",client)
app.get("/",(req,res)=>{
    res.send("server listining on 9800")
})
app.use('/api/admin', adminRoute);
app.use('/api/addData',addData)
app.use('/api/',addSenderID);






export default app;