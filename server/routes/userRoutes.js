const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");
const auth = require("../middleware/auth");
const { register, login, me, updateMe } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);
router.put("/me", auth, updateMe);

module.exports = router;
