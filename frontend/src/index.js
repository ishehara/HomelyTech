import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import {BrowserRouter} from "react-router-dom";




//import Navbar from './components/customerScreens/navbar';
//import Home from './components/customerScreens/home';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<BrowserRouter>

  <React.StrictMode>
    <App />
  </React.StrictMode>,
  //</BrowserRouter>,
  document.getElementById("root")

);

