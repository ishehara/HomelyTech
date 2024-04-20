import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import Ads from '../Advertisements/Advertisement Details/Ads';
import UpdateAds from '../Advertisements/UpdateAds/UpdateAds';
import AddAd from '../Advertisements/AddAd/AddAd';


function home() {
  return (
    
    <div>
      

      <Router>
      <Navbar/>
        <Routes>
          <Route path='/advertisementdetails' element={<Ads/>}/>
          <Route path="/addad" element={<AddAd/>}/>
          <Route path="/advertisementdetails/:id" element={<UpdateAds/>}/>
        </Routes>
      </Router>
    </div>
    
  );
}

export default home;
