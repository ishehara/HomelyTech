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


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/offerForm" element={<OfferForm />} />
        <Route path="/offerManagement" element={<OfferManagement />} />
        <Route path="/offerUpdateForm/:id" element={<OfferUpdateForm />} />


        <Route path="/paymentdetails" element={<PaymentDisplay />} />
        <Route path="/refunddetails" element={<Refunds />} />
        <Route path="/paymentdetails/:id" element={<UpdatePayment />} />
        <Route path="/refunddetails/:id" element={<UpdateRefund />} />

        <Route path="/" element={<Manager />} />
      </Routes>
    </Router>
  );
}

export default App;
