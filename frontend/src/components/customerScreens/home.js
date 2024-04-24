import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import AboutUs from './aboutUs/aboutus'; // Note the correct import path

function Home() {
  return (
    <div>
      <Navbar />
      <br></br>
      <Router>
        <Routes>
          <Route path="/" element={<AboutUs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Home;
