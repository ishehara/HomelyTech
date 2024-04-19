import React from "react";
import "./App.css";
import Manager from "./components/dashboards/manager";
import OfferForm from "./components/offers/offerForm";
import Navbar from "./components/navbar/navbar";
import OfferManagement from "./components/offers/offerManagement";
import PaymentDisplay from "./components/Payment/Payments/Payment";
import UpdatePayment from "./components/Payment/Update Payment/UpdatePayment"
import UpdateRefund from "./components/Payment/UpdateRefund/UpdateRefund"
import Refunds from "./components/Payment/Refunds/Refund"

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import OfferUpdateForm from "./components/offers/offerUpdateForm";

import InsertDetails from "./components/inventory/InsertDetails/InsertDetails";
import DisplayDetails from "./components/inventory/DisplayDetails/displayDetails";
import UpdateDetails from "./components/inventory/UpdateInventory/UpdateDetails";

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



        <Route path="/paymentdetails" element={<PaymentDisplay />} />
        <Route path="/refunddetails" element={<Refunds />} />
        <Route path="/paymentdetails/:id" element={<UpdatePayment />} />
        <Route path="/refunddetails/:id" element={<UpdateRefund />} />


        <Route path="/" element={<Manager />} />

        <Route path ="/addDetails" element = {<InsertDetails/>}/>
          <Route path ="/displayDetails" element = {<DisplayDetails/>}/>
          <Route path ="/displayDetails/:id" element = {<UpdateDetails/>}/>
      </Routes>
    </Router>
  );
}
export default App;
