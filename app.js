
const express = require('express');
import  bodyParser  from 'body-parser';
import cors from 'cors';
import user from './route/user';
// const app = require('../app').default;


// import adminRoutes from './routeadminRoutes';
import admin from './route/admin';

import userInfo from './route/userInfo'
import { mongoconnection } from './db';


const app = express()

console.log(Date.now(),"app");

mongoconnection();
app.use(cors({origin:'*'}));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json())

app.use("/api/user",user)
app.get("/",(req,res)=>{
    res.send("server listining on 9800")
})
app.use("/userInfo",userInfo)
app.use('/api/admin', admin);





export default app;