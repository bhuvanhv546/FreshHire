const express = require("express");
const router = express.Router();

const auth =
  require("../middleware/auth.middleware");

const {
  generateRoadmap
} = require("../controllers/roadmap.controller");

router.post(
  "/generate",
  auth,
  generateRoadmap
);

module.exports = router;