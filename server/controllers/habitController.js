const Habit = require("../models/Habit");

exports.createHabit = async (req, res) => {
  try {
    const { title, frequency, reminderTime, active } = req.body;
    if (!title) return res.status(400).json({ message: "title is required" });

    const habit = await Habit.create({
      userId: req.userId,
      title,
      frequency: frequency || "daily",
      reminderTime: reminderTime || null,
      active: active !== undefined ? active : true,
    });

    return res.status(201).json(habit);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId }).sort({ createdAt: -1 });
    return res.json(habits);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!habit) return res.status(404).json({ message: "habit not found" });
    return res.json(habit);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findOneAndDelete({ _id: id, userId: req.userId });
    if (!habit) return res.status(404).json({ message: "habit not found" });

    return res.json({ message: "habit deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
