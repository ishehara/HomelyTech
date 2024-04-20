import React from 'react';
import ReactDOM from 'react-dom/client';


import App from './App';
import Login from './components/login/login';
import Navbar from './components/customerScreens/navbar';
import Home from './components/customerScreens/home';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

