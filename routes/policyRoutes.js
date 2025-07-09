const express = require('express');
const router = express.Router();

const { uploadData, searchPolicyByUsername, getUserPolicyStats } = require('../controllers/policyController');
const upload = require('../middlewares/upload');

router.post('/upload', upload.single('file'), uploadData);
router.get('/search', searchPolicyByUsername);
router.get('/userPolicyStats', getUserPolicyStats);

module.exports = router;