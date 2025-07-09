const express = require('express');
const router = express.Router();

const schedulerController = require('../controllers/schedulerController');

router.post('/message', schedulerController.scheduleMessage);

module.exports = router;
