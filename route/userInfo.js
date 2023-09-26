const multer = require('multer');
const path =require('path');

import express from 'express';


// import userInfo from '../controller/userInfo';

import { distributeDataToUser, getDistributedData, getDistributedDataInfo, getUserData,getUserDataByUserId,getUserDataDistributed } from '../controller/userInfo';

import userInfo from '../controller/userInfo';
import { verifyToken } from '../middleware/verifyToken';
const bodyParser=require('body-parser');
const router = express.Router();

const app = express()


const dirname = path.resolve(); // Add this line to define __dirname

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.resolve(dirname,'public')));


var storage =multer.diskStorage({destination:(req,file,cb)=>{
    cb(null,'uploads')

},

filename:(req,file,cb)=>{
    cb(null,file.originalname)
}

});

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5, // 5 MB (in bytes)
    }
  });

router.post('/importUser', upload.single('file'), userInfo);
router.get('/getUserData', getUserData);
router.get('/getUserDataDistributed', getUserDataDistributed);

router.get('/getDistributedDataInfo ',verifyToken, getDistributedDataInfo);


router.get('/getUserDataByUserId', getUserDataByUserId);


router.post('/getDistributedData', getDistributedData);
router.post('/distributeDataToUser',distributeDataToUser)

export default router;
