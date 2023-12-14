const express = require('express');
const router = express.Router();
const { addData, getAllData, getDataById, updateData, deleteData, getSimStatistics,addExcelData, searchData } = require('../controller/datamodel');
const { verifyToken } = require('../middleware/verifyToken');

const datamodel = require('../model/datamodel');
const multer = require('multer');
const path =require('path');


// router.post('/addFromExcel', addDataFromExcel);
// router.post('/addManually', addDataManually);
router.post('/addData',addData)
router.get('/getAllData',getAllData)
router.get('/getDataById/:id',getDataById)
// router.put('/updateData/:id',updateData)
router.put('/updateData/:id', verifyToken, updateData);

router.delete('/deleteData',deleteData)
router.get('/getSimStatistics', getSimStatistics)
router.get('/search', searchData);

const dirname = path.resolve(); // Add this line to define __dirname
const bodyParser=require('body-parser');

const app = express()

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

  router.post('/addExcelData', upload.single('file'), addExcelData);

module.exports = router;
