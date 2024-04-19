import React from "react";
import "./App.css";
import Manager from "./components/dashboards/manager";
import OfferForm from "./components/offers/offerForm";
import Navbar from "./components/navbar/navbar";
import OfferManagement from "./components/offers/offerManagement";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import OfferUpdateForm from "./components/offers/offerUpdateForm";
import InsertDetails from "./components/inventory/InsertDetails/InsertDetails";
import DisplayDetails from "./components/inventory/DisplayDetails/displayDetails";
import UpdateDetails from "./components/inventory/UpdateInventory/UpdateDetails";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/offerForm" element={<OfferForm />} />
        <Route path="/offerManagement" element={<OfferManagement />} />

        <Route path="/offerUpdateForm/:id" element={<OfferUpdateForm />} />

        <Route path="/" element={<Manager />} />

        <Route path ="/addDetails" element = {<InsertDetails/>}/>
          <Route path ="/displayDetails" element = {<DisplayDetails/>}/>
          <Route path ="/displayDetails/:id" element = {<UpdateDetails/>}/>
      </Routes>
    </Router>
  );
}
export default App;
