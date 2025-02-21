import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Box } from "@mui/material";

import "./AppointmentsList.css";

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/appointments") // Adjust backend API route if needed
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  return (
    <Box className="container">
      <Typography variant="h4" className="heading">
        Booked Appointments
      </Typography>

      <Box className="appointments-grid">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <Card key={appointment._id} className="appointment-card">
              <CardContent>
                <Typography variant="h6">{appointment.doctorName}</Typography>
                <Typography>Date: {appointment.date}</Typography>
                <Typography>Time Slot: {appointment.timeSlot}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No appointments booked yet.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default AppointmentsList;
