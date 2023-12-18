import express from 'express';
import  isUser  from '../middleware/authMiddleware.js';
import { subUserCreate, getSubuserList, sendEmailsInfo } from '../controller/subuserController.js';

const router = express.Router();

router.post('/subUserCreate', isUser,subUserCreate);
router.get('/getSubuserList', isUser, getSubuserList); // Protected route (admin-only)
router.post('/sendmail',sendEmailsInfo);


export default router;
