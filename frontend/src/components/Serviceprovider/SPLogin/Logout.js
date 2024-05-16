import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';


function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session data
        sessionStorage.clear();
        // Redirect to login page
        navigate('/log');
    };

    return (
        <div className="logout-container"> {/* Apply the class to the container */}
        <Navbar/>
            <h1>Logout</h1>
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout}>Logout</button>
            <Footer/>
        </div>
    );
}

export default Logout;