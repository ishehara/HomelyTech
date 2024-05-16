import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#021024" }}
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to={"/"}
                  className="nav-link text-white"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/sdetails"}
                  className="nav-link text-white"
                  activeClassName="active"
                >
                  Service Providers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/advertisementdetails"}
                  className="nav-link text-white"
                  activeClassName="active"
                >
                  Advertisements
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/createbooking"}
                  className="nav-link text-white"
                  activeClassName="active"
                >
                  Booking
                </NavLink>
              </li>
              {/* <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle text-white"
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

              </li> */}

              
              

              <li className="nav-item">
                <NavLink
                  to={"/addfeedback"}
                  className="nav-link"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
                  <span style={{ color: "white" }}>
                    {" "}
                    Service Provider Feedbacks
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/q&a"}
                  className="nav-link text-white"
                  activeClassName="active"
                >
                  Q&A
                </NavLink>
              </li>
 


              <li className="nav-item">
                <NavLink
                  to={"/conus"}
                  className="nav-link text-white"
                  activeClassName="active"
                >
                  Contac Us
                </NavLink>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sign In
                </a>
                <ul class="dropdown-menu">
                  <li>
                  <NavLink
                      to={"/log"}
                      className="dropdown-item"
                      activeClassName="active"
                    >
                      User Sign In
                    </NavLink>
                  </li>
                  <li>
                  <NavLink
                      to={"/splog"}
                      className="dropdown-item"
                      activeClassName="active"
                    >
                      Service provider Sig In
                    </NavLink>
                    </li>
                    <li>
                    <hr class="dropdown-divider" />
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
                  class="nav-link dropdown-toggle text-white"
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
                      to={"/regi"}

                      className="dropdown-item"
                      activeClassName="active"
                    >
                      User Sign Up
                    </NavLink>
                  </li>
                  <li>

                  <NavLink
                      to={"/sregi"}

                      className="dropdown-item"
                      activeClassName="active"
                    >
                      Service provider Sign Up
                    </NavLink>
                  </li>
                  
                  </ul>
              </li>
              

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sign Out
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <NavLink

                      to={"/logout"}

                      className="dropdown-item"
                      activeClassName="active"
                    >
                      User Sign Out
                    </NavLink>
                  </li>
                  <li>
                    <NavLink

                      to={"/logout"}

                      className="dropdown-item"
                      activeClassName="active"
                    >
                      Service Providers Sign Out
                    </NavLink>
                  </li>
                </ul>
              </li>
              </ul>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
