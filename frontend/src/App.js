import React from "react";
import "./App.css";
import Manager from "./components/dashboards/manager";
import OfferForm from "./components/offers/offerForm";
import Navbar from "./components/navbar/navbar";
import OfferManagement from "./components/offers/offerManagement";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import OfferUpdateForm from "./components/offers/offerUpdateForm";
import Timetables from "./components/timetables/TimetableDetails/Timetables";
import AddTimetable from "./components/timetables/AddTimetable/AddTimetable"
import UpdateTimetable from "./components/timetables/UpdateTimetable/UpdateTimetable"

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/offerForm" element={<OfferForm />} />
        <Route path="/offerManagement" element={<OfferManagement />} />
        <Route path="/offerUpdateForm/:id" element={<OfferUpdateForm />} />

        <Route path="/addtimetable" element={<AddTimetable />} />
        <Route path="/timetabledetails" element={<Timetables />} />
        <Route path="/timetabledetails/:technicianId" element={<UpdateTimetable />} />



        <Route path="/" element={<Manager />} />
      </Routes>
    </Router>
  );
}

export default App;
