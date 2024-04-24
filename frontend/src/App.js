import React from "react";
import "./App.css";
import Manager from "./components/dashboards/manager";
import OfferForm from "./components/offers/offerForm";
//import Navbar from "./components/navbar/navbar";
import OfferManagement from "./components/offers/offerManagement";

import PaymentDisplay from "./components/Payment/Payments/Payment";
import UpdatePayment from "./components/Payment/Update Payment/UpdatePayment";
import UpdateRefund from "./components/Payment/UpdateRefund/UpdateRefund";
import Refunds from "./components/Payment/Refunds/Refund";
import MakePayment from "./components/customerScreens/Payment/AddPayment/AddPayment"
import RefundPayment from "./components/customerScreens/Payment/AddRefund/AddRefund"



import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import OfferUpdateForm from "./components/offers/offerUpdateForm";

import InsertDetails from "./components/inventory/InsertDetails/InsertDetails";
import DisplayDetails from "./components/inventory/DisplayDetails/displayDetails";
import UpdateDetails from "./components/inventory/UpdateInventory/UpdateDetails";

import Timetables from "./components/timetables/TimetableDetails/Timetables";
import AddTimetable from "./components/timetables/AddTimetable/AddTimetable";
import UpdateTimetable from "./components/timetables/UpdateTimetable/UpdateTimetable";

import Ads from "./components/Advertisements/Advertisement Details/Ads";
import AddAd from "./components/Advertisements/AddAd/AddAd";
import UpdateAds from "./components/Advertisements/UpdateAds/UpdateAds";
import AdReport from "./components/Advertisements/Advertisement Report/AdReport";

import Home from "./components/customerScreens/home";
import AdminLogin from "./components/login/AdminLogin";
import AboutUs from "./components/customerScreens/aboutUs/aboutus";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/manager" element={<Manager />} />
        <Route path="/offerForm" element={<OfferForm />} />
        <Route path="/offerManagement" element={<OfferManagement />} />
        <Route path="/offerUpdateForm/:id" element={<OfferUpdateForm />} />

        <Route path="/addtimetable" element={<AddTimetable />} />
        <Route path="/timetabledetails" element={<Timetables />} />
        <Route
          path="/timetabledetails/:technicianId"
          element={<UpdateTimetable />}
        />

        <Route path="/paymentdetails" element={<PaymentDisplay />} />
        <Route path="/refunddetails" element={<Refunds />} />
        <Route path="/paymentdetails/:id" element={<UpdatePayment />} />
        <Route path="/refunddetails/:id" element={<UpdateRefund />} />
        <Route path="/makePayment" element={<MakePayment />} />
        <Route path="/refundPayment" element={<RefundPayment />} />

        

        <Route path="/addDetails" element={<InsertDetails />} />
        <Route path="/displayDetails" element={<DisplayDetails />} />
        <Route path="/displayDetails/:id" element={<UpdateDetails />} />

        <Route path="/advertisementdetails" element={<Ads />} />
        <Route path="/addad" element={<AddAd />} />
        <Route path="/advertisementdetails/:id" element={<UpdateAds />} />
        <Route path="/adreport" element={<AdReport />} />

        <Route path="/" element={<Home/>}/>

        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/aboutus" element={<AboutUs />} />

      </Routes>
    </Router>
  );
}
export default App;
