const express = require('express');
const router = express.Router();
const { addSenderID, getSenderId } = require('../controller/senderId');


router.post('/addSenderID',addSenderID)
router.get('/getSenderId',getSenderId)


module.exports = router;
