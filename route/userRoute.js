import express from 'express';
import { createUsers ,getUserList } from '../controller/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import isAdmin from '../middleware/authMiddleware.js';
import isUser from '../middleware/authMiddleware.js'
import { getSubuserList, subUserCreate } from '../controller/subuserController.js';
// import {checkEmail} from '../middleware/checkEmail'
// import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();



//  router.post('/userSignup',checkEmail,userSignup);
//  router.post('/addForm',checkEmail,addForm);

//  router.post('/Login',Login);
//  router.post("/updateUser", updateUser);

router.post('/createUsers', isAdmin,createUsers);


router.get('/userList', isAdmin, getUserList); // Protected route (admin-only)

// router.post('/loginUser',loginUser)
// router.get('/getUserList',getUserList)

// router.post('/deleteUsers',deleteUsers)


 


export default router;