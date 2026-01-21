const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    frequency: {
      type: String,
      enum: ["daily", "weekdays", "weekends", "custom"],
      default: "daily",
    },
    reminderTime: { type: String, default: null }, // "08:00"
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);
