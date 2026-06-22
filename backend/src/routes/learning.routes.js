const express = require('express');
const router = express.Router();

const {
  getResources
} = require('../controllers/learning.controller');

router.post('/resources', getResources);

module.exports = router;