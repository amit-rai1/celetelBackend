// routes/adminRoutes.js

import express from 'express';
import { registerAdmin, loginAdmin, authLogin } from '../controller/admin';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/authLogin', authLogin);


export default router;
