import express from 'express';
// import { getDistributedDataInfo } from '../controller/DistributedData';
import {getDistributedDataInfo} from '../controller/DistributedData';
import DistributedData from '../model/DistributedData';

const router = express.Router();

router.get('/getDistributedDataInfo/:id', getDistributedDataInfo);

export default router;
