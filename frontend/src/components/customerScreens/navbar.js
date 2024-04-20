import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link" activeClassName="active">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/serviceproviders"} className="nav-link" activeClassName="active">Service Providers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/advertisementdetails"} className="nav-link" activeClassName="active">Advertisements</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/bookings"} className="nav-link" activeClassName="active">Booking</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
