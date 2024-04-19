import React from "react";
import { Link } from "react-router-dom";

function navbar() {
  return (
    <nav className="navbar navbar-dark" style={{ backgroundColor: "#021024" }}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div class="d-flex justify-content-center align-items-center">
          <a class="navbar-brand" href="#">
            Welcome to homelyTech...
          </a>
        </div>

        <div
          className="offcanvas offcanvas-start text-bg-dark"
          style={{ backgroundColor: "#021024" }} // Inline styling for offcanvas background color
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Tools for your help
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-start flex-grow-1 ps-3">
              <li className="nav-item">
              <Link to="/" className="nav-link">Dashboard</Link>
              
              </li>
              <li className="nav-item">
              <Link to="/offerManagement" className="nav-link">Offers Management</Link>
              
              </li>
              <li className="nav-item">
              <Link to="/paymentdetails" className="nav-link">Payment Management</Link>
              
              </li>
              <li className="nav-item">
              <Link to="/refunddetails" className="nav-link">Refund Payment Management</Link>
              
              </li>
              <li className="nav-item">
                  <Link to="/timetabledetails" className="nav-link">Timetable Management</Link>
              </li>
              
            </ul>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default navbar;
