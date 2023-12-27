import express from 'express';
import  isUser  from '../middleware/authMiddleware.js';
import { subUserCreate, getSubuserList, sendEmailsInfo, getSubUserById, updatesubUserById, deleteSubuser } from '../controller/subuserController.js';

const router = express.Router();

router.post('/subUserCreate', isUser,subUserCreate);
router.get('/getSubuserList', isUser, getSubuserList); // Protected route (admin-only)
router.post('/sendmail',sendEmailsInfo);
router.get('/getSubuserById/:id',getSubUserById)
router.put('/updatesubser/:id', updatesubUserById);
router.delete('/deleteSubuser/',deleteSubuser)

export default router;
