import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';

import HomeScreen from './HomeScreen/HomeScreen';
import Footer from './Footer/footer'

function home() {
  return (
    
    <div>
      <Navbar/>
      <h1>This is homepage</h1>
      <HomeScreen/>
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
