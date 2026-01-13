const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { completeHabit, getProgress } = require("../controllers/progressController");

router.use(auth);

router.post("/complete", completeHabit);
router.get("/", getProgress);

module.exports = router;
