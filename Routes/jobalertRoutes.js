const express = require('express');
const { sendJobAlert, getJobAlerts } = require('../controllers/jobAlertController');

const router = express.Router();

router.post('/send', sendJobAlert);
router.get('/', getJobAlerts);

module.exports = router;