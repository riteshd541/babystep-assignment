const express = require("express");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const router = express.Router();

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// Book a new appointment
router.post("/", async (req, res) => {
  try {
    const { doctorId, doctorName, date, timeSlot } = req.body;

    if (!doctorId || !doctorName || !date || !timeSlot) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Fetch existing booked slots
    const bookedAppointments = await Appointment.find({
      doctorId,
      date,
      timeSlot,
    });

    if (bookedAppointments.length >= 5) {
      return res.status(400).json({ error: "Time slot fully booked" });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      doctorId,
      doctorName,
      date,
      timeSlot,
    });
    await newAppointment.save();

    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

module.exports = router;
