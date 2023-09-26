const express = require('express');
import { mongoconnection } from '../db';
import  bodyParser  from 'body-parser';
import cors from 'cors';
import user from '../route/user';
// const app = require('../app').default;


// import adminRoutes from './routeadminRoutes';
import admin from '../route/admin';

import userInfo from '../route/userInfo'


const app = express()

mongoconnection();
app.use(cors({origin:'*'}));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json())

app.use("/api/user",user)

app.use("/userInfo",userInfo)
app.use('/api/admin', admin);





export default app;