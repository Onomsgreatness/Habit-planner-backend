const Progress = require("../models/Progress");

// Mark habit complete for a date
exports.completeHabit = async (req, res) => {
  try {
    const { habitId, date } = req.body;
    if (!habitId || !date) {
      return res.status(400).json({ message: "habitId and date required" });
    }

    const progress = await Progress.findOneAndUpdate(
      { userId: req.userId, habitId, date },
      { completed: true },
      { upsert: true, new: true, runValidators: true }
    );

    return res.status(201).json(progress);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "already completed" });
    }
    return res.status(500).json({ message: err.message });
  }
};

// Get progress for a habit in date range
exports.getProgress = async (req, res) => {
  try {
    const { habitId, from, to } = req.query;
    if (!habitId) return res.status(400).json({ message: "habitId required" });

    const query = { userId: req.userId, habitId };
    if (from && to) query.date = { $gte: from, $lte: to };

    const progress = await Progress.find(query).sort({ date: 1 });
    return res.json(progress);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
