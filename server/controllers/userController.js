const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) return res.status(400).json({ message: "name is required" });
    if (!email || !password) return res.status(400).json({ message: "email and password required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name: name?.trim(), email, passwordHash });

    return res.status(201).json({ token: signToken(user._id) });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "invalid credentials" });

    return res.json({ token: signToken(user._id) });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email createdAt");
    if (!user) return res.status(404).json({ message: "user not found" });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name: name?.trim() },
      { new: true, runValidators: true }
    ).select("name email");
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
