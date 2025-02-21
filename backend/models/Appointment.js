const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor", // Reference the Doctor model
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  date: {
    type: String, // Store date as "YYYY-MM-DD"
    required: true,
  },
  timeSlot: {
    type: String, // Example: "10-11 AM"
    required: true,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
