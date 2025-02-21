import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DoctorsList from "./pages/DoctorsList";
import AppointmentsList from "./pages/AppointmentsList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorsList />} />
        <Route path="/appointments" element={<AppointmentsList />} />
      </Routes>
    </Router>
  );
}

export default App;
