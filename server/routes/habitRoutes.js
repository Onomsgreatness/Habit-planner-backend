const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
} = require("../controllers/habitController");

router.use(auth);

router.post("/", createHabit);
router.get("/", getHabits);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);

module.exports = router;
