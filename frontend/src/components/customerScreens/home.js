import React from 'react';
import { Router } from 'react-router-dom';
import Navbar from './navbar';

function home() {
  return (
    <Router>
        <Navbar/>
    </Router>
    
  );
}

export default home;
