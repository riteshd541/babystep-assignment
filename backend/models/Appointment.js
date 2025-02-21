const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  doctorName: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  patientName: { type: String, required: true },
  appointmentType: { type: String, required: true },
  notes: { type: String },
  contactNo: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
