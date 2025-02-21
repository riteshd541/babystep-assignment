const express = require("express");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const router = express.Router();

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find({}, "-__v");
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// Book a new appointment
router.post("/", async (req, res) => {
  try {
    const {
      doctorId,
      doctorName,
      date,
      timeSlot,
      patientName,
      appointmentType,
      notes,
      contactNo,
    } = req.body;

    if (
      !doctorId ||
      !doctorName ||
      !date ||
      !timeSlot ||
      !patientName ||
      !contactNo
    ) {
      return res.status(400).json({
        error:
          "Doctor, Date, Time Slot, Patient Name, and Contact No are required.",
      });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const bookedAppointments = await Appointment.find({
      doctorId,
      date,
      timeSlot,
    });
    if (bookedAppointments.length >= 5) {
      return res.status(400).json({ error: "Time slot fully booked" });
    }

    // Create and log the appointment before saving
    const newAppointment = new Appointment({
      doctorId,
      doctorName,
      date,
      timeSlot,
      patientName,
      appointmentType,
      notes,
      contactNo,
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

module.exports = router;
