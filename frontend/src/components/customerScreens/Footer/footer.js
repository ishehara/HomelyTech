import React from 'react';
import { Link } from "react-router-dom";
import './footer.css';

function Footer() {
  return (
    <div>
      <footer className="footer" >
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 footer-info">
                <br/>
              <h3>Service Facilitating Management System</h3>
              <p>Our platform simplifies service management tasks, allowing you to focus on what matters most - delivering exceptional service to your customers.</p>
            </div>
            <div className="col-lg-4 col-md-6 footer-links">
            <br/>
              <h4>Useful Links</h4>
              <ul>
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/" className="nav-link">About Us</Link></li>
              <li><Link to="/" className="nav-link">Services</Link></li>
              <li><Link to="/" className="nav-link">Contact Us</Link></li>
                
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 footer-contact">
            <br/>
              <h4>Contact Us</h4>
              <p>
                <strong>Address:</strong> 123 Service Street, Cityville, State, Country<br />
                <strong>Phone:</strong> +123 456 7890<br />
                <strong>Email:</strong> info@servicemanagement.com<br />
              </p>
              <div className="social-links">
             
                {/* <a href="#" className="twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" className="facebook"><i className="fab fa-facebook"></i></a>
                <a href="#" className="instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" className="linkedin"><i className="fab fa-linkedin"></i></a> */}
              </div>
            </div>
          </div>
      
      <br/> <br/>
          <div className="row">
            <div className="col-lg-12">
              <p className="text-center">&copy; 2024 Service Management System. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
