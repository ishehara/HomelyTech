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

import UserPayment from "./components/customerScreens/Payment/userPayment";
import GenerateReport from "./components/Payment/Refunds/AddGenerate"
import Addreport from "./components/Payment/Refunds/report"
import Display from "./components/Payment/Refunds/displayefund"
import UserRefund from "./components/customerScreens/Payment/userRefund"



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

import Create from "./components/customerScreens/AddBooking/AddBooking"
import Details from "./components/customerScreens/BookingDetails/bookingDetails"
import Update from "./components/customerScreens/UpdateBooking/updateBooking"

//adding user feedback part
import AddFeedback from "./components/Ufeedbak/AddFeedback/AddFeedback";
import Feedbacks from "./components/Ufeedbak/FeedbackDetails/Feedbacks";
import UpdateFeedback from "./components/Ufeedbak/UpdateFeedback/UpdateFeedback";
import QASection from "./components/Ufeedbak/QASection/QASection";



//adding user parts
import AddUser from "./components/User/AddUser/AddUser";
import Users from "./components/User/UserDetails/Users";
import UpdateUser from "./components/User/UpdateUser/UpdateUser";
import Register from "./components/User/Register/Register";
import Login from "./components/User/Login/Login";
import Logout from "./components/User/Login/Logout";
import ContactUs from "./components/User/ContactUs/Contactus";
import NormalUserDetails from "./components/User/UserDetails/NormalUserDetails";

//adding Service Provider parts
import Sregister from "./components/Serviceprovider/SproviderRegister/Sregister";
import Sproviders from "./components/Serviceprovider/Sprovider/Sprovider";
import ServiceProviderDetails from "./components/Serviceprovider/ServiceProviderDetails/ServiceProviderDetails";
import ServiceLogin from "./components/Serviceprovider/SPLogin/SpLogin";
import UpdateServiceProvider from "./components/Serviceprovider/UpdateServiceprovider/UpdateServiceProvider";



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
        <Route path="/makePayment/:hourlyRate" element={<MakePayment />} />
        <Route path="/refundPayment" element={<RefundPayment />} />

        <Route path="/userPayment" element={<UserPayment />} />
        <Route path="/userRefund" element={<UserRefund />} />
        
        {/* <Route path="/addpayment/:amount" element={<AddPayment />} /> */}

         <Route path="/generate" element={<GenerateReport />} />
        <Route path="/adreport" element={<Addreport />} /> 
        <Route path="/display" element={<Display />} /> 
        


        

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

        <Route path="/createbooking" element={<Create />} />
        <Route path="/bookingdetails" element={<Details />} />
        <Route path="/bookingdetails/:id" element={<Update />} />

        <Route path="/addfeedback" element={<AddFeedback />} />
        <Route path="/feedbackdetails" element={<Feedbacks />} />
        <Route path="/feedbackdetails/:id" element={<UpdateFeedback />} />
        <Route path="/q&a" element={<QASection />} /> 


        <Route path="/adduser" element={<AddUser />} />
        <Route path="/userdetails" element={<Users />} />
        <Route path="/normalUserDetails" element={<NormalUserDetails />} />
        <Route path="/regi" element={<Register />} />
        <Route path="/log" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/conus" element={<ContactUs />} />
        <Route path="/userdetails/:id" element={<UpdateUser />} />

        <Route path="/sdetails" element={<Sproviders/>}/>
        <Route path="/sregi" element={<Sregister/>}/>
        <Route path="/splog" element={<ServiceLogin/>}/>
        <Route path="/serviceProviderDetails" element={<ServiceProviderDetails />} />
        <Route path="/update-service-provider/:id" element={<UpdateServiceProvider />} />

      </Routes>
    </Router>
  );
}
export default App;
