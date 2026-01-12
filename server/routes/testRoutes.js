const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/protected", auth, (req, res) => {
  res.json({ message: "You can access this", userId: req.userId });
});

module.exports = router;
