const express = require("express");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment"); // Import Appointment model
const router = express.Router();

// Function to generate time slots
const generateSlots = (start, end) => {
  let slots = [];
  let [startHour] = start.split(":").map(Number);
  let [endHour] = end.split(":").map(Number);

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour}:00-${hour + 1}:00`);
  }

  return slots;
};

// Get doctors with available slots
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    const doctorsWithSlots = await Promise.all(
      doctors.map(async (doctor) => {
        let availableSlots = generateSlots("10:00", "18:00"); // Change according to doctor's working hours

        // Fetch booked slots for the doctor
        const bookedAppointments = await Appointment.find({
          doctorId: doctor._id,
        });
        const bookedSlots = bookedAppointments.map((app) => app.timeSlot);

        // Filter available slots
        availableSlots = availableSlots.filter(
          (slot) => bookedSlots.filter((b) => b === slot).length < 5
        );

        return {
          ...doctor.toObject(),
          slots: availableSlots,
        };
      })
    );

    res.json(doctorsWithSlots);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

module.exports = router;
