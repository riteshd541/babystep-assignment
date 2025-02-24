import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
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
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [notes, setNotes] = useState("");
  const [contactNo, setContactNo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://babystep-backend.onrender.com/doctors")
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
    if (
      !selectedDoctor ||
      !selectedDate ||
      !selectedTimeSlot ||
      !patientName ||
      !appointmentType ||
      !contactNo
    ) {
      alert("Please fill in all fields!");
      return;
    }

    const appointmentData = {
      doctorId: selectedDoctor._id,
      doctorName: selectedDoctor.name,
      date: selectedDate.format("YYYY-MM-DD"),
      timeSlot: selectedTimeSlot,
      patientName,
      appointmentType,
      notes,
      contactNo,
    };

    axios
      .post(
        "https://babystep-backend.onrender.com/appointments",
        appointmentData
      )
      .then(() => {
        alert(
          "Appointment confirmed successfully! Redirecting you to appointments section..."
        );
        navigate("/appointments");
      })
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
          <Typography style={{ marginBottom: "1rem" }} variant="h5">
            Book an Appointment with {selectedDoctor.name}
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              margin="dense"
              minDate={dayjs().add(1, "day")}
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
            <>
              <TextField
                margin="dense"
                label="Patient Name"
                fullWidth
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Appointment Type"
                fullWidth
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Contact Number"
                fullWidth
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Notes"
                fullWidth
                multiline
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <Button
                variant="contained"
                color="primary"
                className="confirm-btn"
                onClick={handleConfirmAppointment}
              >
                Confirm Appointment
              </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

export default DoctorsList;
