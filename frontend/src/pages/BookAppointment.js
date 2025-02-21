import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookAppointment() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/doctors/${id}`)
      .then((res) => setDoctor(res.data));
  }, [id]);

  const handleSubmit = () => {
    axios.post("http://localhost:5000/appointments", {
      doctorId: id,
      date,
      patientName,
    });
  };

  return doctor ? (
    <div>
      <h2>Book Appointment with {doctor.name}</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        placeholder="Your Name"
      />
      <button onClick={handleSubmit}>Book</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default BookAppointment;
