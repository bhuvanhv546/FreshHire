const express = require("express");
const router = express.Router();
const { scoreResume } = require("../controllers/ats.controller");

router.post("/score", scoreResume);

module.exports = router;