import React from "react";
import { NavLink } from "react-router-dom";
 

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link" activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/serviceproviders"}
                  className="nav-link"
                  activeClassName="active"
                >
                  Service Providers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/serviceproviders"}
                  className="nav-link"
                  activeClassName="active"
                >
                  User Details
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/advertisementdetails"}
                  className="nav-link"
                  activeClassName="active"
                >
                  Advertisements
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/bookings"}
                  className="nav-link"
                  activeClassName="active"
                >
                  Booking
                </NavLink>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Payment
                </a>
                <ul class="dropdown-menu">
                  <li>
                  <NavLink
                        to={"/makePayment"}
                        className="dropdown-item"
                        activeClassName="active"
                      >
                        Make Payment
                      </NavLink>
                  </li>
                  <li>
                  <NavLink
                        to={"/refundPayment"}
                        className="dropdown-item"
                        activeClassName="active"
                      >
                        Refund Payment
                      </NavLink>
                  </li>
                </ul>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Register
                </a>
                <ul class="dropdown-menu">
                  <li>
                  <NavLink
                        to={"/regi"}
                        className="dropdown-item"
                        activeClassName="active"
                      >
                        User Register
                      </NavLink>
                  </li>
                  <li>
                  <NavLink
                        to={"/refundPayment"}
                        className="dropdown-item"
                        activeClassName="active"
                      >
                        Service Provider Register
                      </NavLink>
                  </li>
                </ul>
              </li>
              
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  SignIn
                </a>
                <ul class="dropdown-menu">
                <li>
                    <NavLink
                        to={"/log"}
                        className="dropdown-item"
                        activeClassName="active"
                      >
                        User SignIn
                      </NavLink>
                    
                  </li>
                  <li>
                    <NavLink
                        to={"/log"}
                        className="dropdown-item"
                        activeClassName="active"
                      >
                        Service Provider SignIn
                      </NavLink>
                    
                  </li>
                  
                  
                  <li>
                    <NavLink
                        to={"/adminlogin"}
                        className="dropdown-item"
                        activeClassName="active"
                      >
                        Admin SignIn
                      </NavLink>
                    
                  </li>
                </ul>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sign Up
                </a>
                <ul class="dropdown-menu">
                <li>
                    <NavLink
                        to={"/logout"}
                        className="dropdown-item"
                        activeClassName="active"
                      >
                        User SignUp
                      </NavLink>
                    
                  </li>
                  <li>
                    <NavLink
                        to={"/logout"}
                        className="dropdown-item"
                        activeClassName="active"
                      >
                        Service Provider SignUp
                      </NavLink>
                    
                  </li>
                
                </ul>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/conus"}
                  className="nav-link"
                  activeClassName="active"
                >
                  Contact Us
                </NavLink>
              </li>
              
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
