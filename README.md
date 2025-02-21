## Appointment Booking System

This project is a full-stack application that allows users to book appointments with doctors. It consists of a **frontend** (React) and a **backend** (Node.js with Express and MongoDB).

---

## Features
- Book appointments with available doctors
- View all booked appointments
- Group appointments by doctor
- Responsive UI built with Material-UI

---

## Installation & Running the Project

### Backend Setup

#### Prerequisites:
- Node.js installed
- MongoDB installed and running

#### Steps:
```bash
# Clone the repository
git clone https://github.com/riteshd541/babystep-assignment.git

# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
Create a `.env` file in the backend root directory and add:
MONGO_URI=your_mongo_db_connection_string
PORT=5000

# Start the server
npm start
```
By default, the backend will run on `http://localhost:5000`.

---

### Frontend Setup

#### Prerequisites:
- Node.js installed

#### Steps:
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React application
npm start
```
The frontend will run on `http://localhost:3000`.

---

## API Endpoints

### 1. Get all Doctor
```http
GET /doctors
```
Response:
```json
[
    {
        "_id": "67b815200465b70c4cd8e258",
        "name": "Dr. Kamlesh Singh",
        "specialty": "Orthopedic",
        "experience": 7,
        "slots": [
            "10:00-11:00",
            "11:00-12:00",
            "12:00-13:00",
            "13:00-14:00",
            "14:00-15:00",
            "15:00-16:00",
            "16:00-17:00",
            "17:00-18:00"
        ]
    }
]
```


### 2. Get all appointments
```http
GET /appointments
```
Response:
```json
[
    {
        "_id": "67b83e8ccb091d37545ac215",
        "doctorId": "67b81ab40465b70c4cd8e25c",
        "doctorName": "Dr. Anil Mehta",
        "date": "2025-02-22",
        "timeSlot": "13:00-14:00",
        "patientName": "Anmol",
        "appointmentType": "Temporary",
        "notes": "I want to show my ear mole.",
        "contactNo": "8798789871"
    }
]
```

### 3. Book an appointment
```http
POST /appointments
```
Request Body:
```json
{
    "doctorId": "67b81ab40465b70c4cd8e25c",
    "doctorName": "Dr. Anil Mehta",
    "date": "2025-02-22",
    "timeSlot": "13:00-14:00",
    "patientName": "Anmol",
    "appointmentType": "Temporary",
    "notes": "I want to show my ear mole.",
    "contactNo": "8798789871"
}
```
Response:
```json
{
    "message": "Appointment booked successfully!"
}
```

---

## Assumptions & Design Decisions

1. **Grouping by Doctor**
   - The UI groups appointments under each doctor instead of listing them separately.
   
2. **Date Format**
   - Dates are stored in `YYYY-MM-DD` format for consistency.
   
3. **Validation**
   - Patients cannot book overlapping time slots for the same doctor.

---

## Future Improvements
- Implement authentication for doctors and patients.
- Add email/SMS notifications for appointment confirmations.
- Improve the UI with additional filters and search functionality.

---

## License
Created by Ritesh Dwivedi
