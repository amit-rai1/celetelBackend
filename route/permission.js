import express from 'express';
import { getUserPermissions, setPermissions } from '../controller/permission';

const router = express.Router();



router.post('/set-permissions', setPermissions);
router.get('/getUserPermissions/:userId',getUserPermissions)






export default router;