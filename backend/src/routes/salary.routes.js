const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salary.controller');

router.post('/predict', salaryController.predictSalary);

module.exports = router;