const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: String,
  workingHours: {
    start: String, // Example: "10:00 AM"
    end: String, // Example: "6:00 PM"
  },
  slots: {
    type: Map, // Store available slots per date
    of: Map, // Example: { "2025-02-21": { "10-11 AM": 3, "11-12 PM": 5 } }
    default: {},
  },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
