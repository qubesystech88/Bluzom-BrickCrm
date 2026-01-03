const express = require('express');
const router = express.Router();
const workController = require('../controllers/workController');

router.get('/', workController.getAllWork);
router.post('/', workController.createWork);

module.exports = router;
