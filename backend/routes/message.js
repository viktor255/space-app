const express = require('express');

const checkAuth = require('../middleware/check-auth');
const messageController = require("../controllers/message");
const router = express.Router();

router.get('', checkAuth, messageController.getAllMessagesInChat);

router.post('', checkAuth, messageController.createMessage);

module.exports = router;
