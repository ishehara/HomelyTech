import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import Ads from '../Advertisements/Advertisement Details/Ads';
import UpdateAds from '../Advertisements/UpdateAds/UpdateAds';
import AddAd from '../Advertisements/AddAd/AddAd';
import HomeScreen from './HomeScreen/HomeScreen';
import Footer from './Footer/footer'

function home() {
  return (
    
    <div>
      <Navbar/>
      <h1>This is homepage</h1>
      <Footer/>
      

      {/* <Router>
      <Navbar/>
        <Routes>
        <Route path="/" element={<HomeScreen/>}/>
        
          <Route path='/advertisementdetails' element={<Ads/>}/>
          <Route path="/addad" element={<AddAd/>}/>
          <Route path="/advertisementdetails/:id" element={<UpdateAds/>}/>

        </Routes>

      </Router> */}

    </div>
    
  );
}

export default home;
