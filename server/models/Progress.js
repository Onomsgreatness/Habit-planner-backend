const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true, index: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    completed: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Prevent duplicates: one record per habit per day per user
progressSchema.index({ userId: 1, habitId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema);
