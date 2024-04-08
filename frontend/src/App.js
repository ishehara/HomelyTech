import React from "react";
import "./App.css";
import Manager from "./components/dashboards/manager";
import OfferForm from "./components/offers/offerForm";
import Navbar from "./components/navbar/navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/offerForm" element={<OfferForm />} />

        <Route path="/" element={<Manager />} />
      </Routes>
    </Router>
  );
}

export default App;
