import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import "./DoctorsList.css";

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/doctors")
      .then((res) => setDoctors(res.data));
  }, []);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setTimeSlots([]);
    setSelectedTimeSlot("");
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setTimeSlots(selectedDoctor.slots);
    setSelectedTimeSlot("");
  };

  const handleConfirmAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTimeSlot) {
      alert("Please select a doctor, date, and time slot!");
      return;
    }

    const appointmentData = {
      doctorId: selectedDoctor._id,
      doctorName: selectedDoctor.name,
      date: selectedDate.format("YYYY-MM-DD"),
      timeSlot: selectedTimeSlot,
    };

    axios
      .post("http://localhost:5000/appointments", appointmentData)
      .then(() => alert("Appointment confirmed successfully!"))
      .catch((err) => console.error("Error booking appointment:", err));
  };

  return (
    <Box className="container">
      <Button
        variant="contained"
        color="secondary"
        className="view-appointments-btn"
        onClick={() => navigate("/appointments")}
      >
        See Booked Appointments
      </Button>

      {!selectedDoctor && (
        <>
          <Typography variant="h4" className="heading">
            Choose a Doctor
          </Typography>

          <Grid container spacing={3} className="doctors-grid">
            {doctors.map((doctor) => (
              <Grid item xs={12} sm={6} md={4} key={doctor._id}>
                <Card
                  className="doctor-card"
                  onClick={() => handleDoctorClick(doctor)}
                >
                  <img
                    src={doctor.image || "/default-doctor.jpg"}
                    alt={doctor.name}
                    className="doctor-img"
                  />
                  <CardContent>
                    <Typography variant="h6">{doctor.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {doctor.specialty}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {selectedDoctor && (
        <Box className="slot-picker">
          <Button
            variant="outlined"
            color="secondary"
            className="back-btn"
            onClick={() => setSelectedDoctor(null)}
          >
            Back to Doctor List
          </Button>
          <Typography variant="h5">
            Book an Appointment with {selectedDoctor.name}
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select a date"
              value={selectedDate}
              onChange={handleDateChange}
              className="date-picker"
            />
          </LocalizationProvider>

          {selectedDate && timeSlots.length > 0 && (
            <Box className="time-slots">
              <Typography variant="h6">Select a Time Slot:</Typography>
              <Grid container spacing={2} justifyContent="center">
                {timeSlots.map((slot) => (
                  <Grid item key={slot}>
                    <Button
                      variant={
                        selectedTimeSlot === slot ? "contained" : "outlined"
                      }
                      color="primary"
                      className="time-slot-btn"
                      onClick={() => setSelectedTimeSlot(slot)}
                    >
                      {slot}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {selectedTimeSlot && (
            <Button
              variant="contained"
              color="primary"
              className="confirm-btn"
              onClick={handleConfirmAppointment}
            >
              Confirm Appointment
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}

export default DoctorsList;
