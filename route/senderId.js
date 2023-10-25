const express = require('express');
const router = express.Router();
const { addSenderID, getSenderId, deleteData } = require('../controller/senderId');


router.post('/addSenderID',addSenderID)
router.get('/getSenderId',getSenderId)
router.delete('/deleteData',deleteData)


module.exports = router;
