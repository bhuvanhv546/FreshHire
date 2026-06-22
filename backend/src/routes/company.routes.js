const express = require('express');
const router = express.Router();

const {
  trackCompany
} = require('../controllers/company.controller');

router.post('/track', trackCompany);

module.exports = router;