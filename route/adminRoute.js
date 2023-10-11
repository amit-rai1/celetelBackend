// routes/adminRoutes.js

import express from 'express';
import { registerAdmin, loginAdmin, authLogin } from '../controller/adminController';

const router = express.Router();

router.post('/register', registerAdmin);
// router.post('/login', loginAdmin);
router.post('/authLogin', authLogin);


export default router;
