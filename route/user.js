import express from 'express';
import { createUser, deleteUsers, getUserList, loginUser} from '../controller/user.js';
import { verifyToken } from '../middleware/verifyToken.js';
// import {checkEmail} from '../middleware/checkEmail'
// import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();



//  router.post('/userSignup',checkEmail,userSignup);
//  router.post('/addForm',checkEmail,addForm);

//  router.post('/Login',Login);
//  router.post("/updateUser", updateUser);

router.post('/createUser',createUser);
router.post('/loginUser',loginUser)
router.get('/getUserList',getUserList)

router.post('/deleteUsers',deleteUsers)


 


export default router;