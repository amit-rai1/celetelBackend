const express = require('express');
const router = express.Router();
const { addData, getAllData, getDataById, updateData, deleteData } = require('../controller/datamodel');

// router.post('/addFromExcel', addDataFromExcel);
// router.post('/addManually', addDataManually);
router.post('/addData',addData)
router.get('/getAllData',getAllData)
router.get('/getDataById/:id',getDataById)
router.put('/updateData/:id',updateData)
router.delete('/deleteData',deleteData)

module.exports = router;
