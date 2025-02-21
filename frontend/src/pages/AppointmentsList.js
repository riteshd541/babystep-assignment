import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Box } from "@mui/material";

import "./AppointmentsList.css";

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("https://babystep-backend.onrender.com/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  // Grouping appointments by doctorName
  const groupedAppointments = appointments.reduce((acc, appointment) => {
    const { doctorName } = appointment;
    if (!acc[doctorName]) {
      acc[doctorName] = [];
    }
    acc[doctorName].push(appointment);
    return acc;
  }, {});

  return (
    <Box className="container">
      <Typography variant="h4" className="heading">
        Booked Appointments
      </Typography>

      <Box className="appointments-grid">
        {Object.keys(groupedAppointments).length > 0 ? (
          Object.keys(groupedAppointments).map((doctorName) => (
            <Card key={doctorName} className="doctor-card">
              <CardContent>
                {/* Doctor's Name */}
                <Typography variant="h5" className="doctor-name">
                  {doctorName}
                </Typography>

                {/* List of Patients for this Doctor */}
                {groupedAppointments[doctorName].map((appointment) => (
                  <Card
                    key={appointment._id}
                    variant="outlined"
                    className="patient-details-card"
                  >
                    <CardContent>
                      <Typography>Date: {appointment.date}</Typography>
                      <Typography>Time Slot: {appointment.timeSlot}</Typography>
                      <Typography>
                        Patient: {appointment.patientName}
                      </Typography>
                      <Typography>
                        Type: {appointment.appointmentType}
                      </Typography>
                      <Typography>Notes: {appointment.notes}</Typography>
                      <Typography>Contact: {appointment.contactNo}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography className="no-appointments">
            No appointments booked yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default AppointmentsList;
