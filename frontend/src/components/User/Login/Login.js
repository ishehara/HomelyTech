import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';

function Login() {
    const history = useNavigate();
    const [user, setUser] = useState({
        gmail: "",
        password: "",
    });
    const [otp, setOTP] = useState(""); // State variable to store OTP
    const [showOTPInput, setShowOTPInput] = useState(false); // State variable to track OTP input display
    const [loggedInUser, setLoggedInUser] = useState(null); // State variable to store the logged-in user

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleOTPChange = (e) => {
        setOTP(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear existing session data
        sessionStorage.clear();

        try {
            const response = await sendRequest();
            if (response.status === "ok") {
                //alert("Login success");
                setShowOTPInput(true); // Show OTP input if login status is "ok"
                setLoggedInUser(response.user); // Store the logged-in user data
            } else {
                alert("Login error");
            }
        } catch (err) {
            alert("error" + err.message);
        }
    };

    const handleOTPSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send OTP to the server for validation
            const response = await validateOTP(otp, loggedInUser);
            if (response.status === "ok") {
                alert("OTP verification successful");
                sessionStorage.setItem('isLoggedIn', true);
                sessionStorage.setItem('userId', response.user._id); // Set userId in sessionStorage
                if (response.user.userLevel === "admin") {
                    sessionStorage.setItem('isAdmin', true); // Set isAdmin flag
                    history("/userdetails");
                } else {
                    sessionStorage.setItem('isAdmin', false); // Set isAdmin flag
                    history("/normalUserDetails");
                }
            } else {
                alert("OTP verification failed");
            }
        } catch (err) {
            alert("error" + err.message);
        }
    };

    const sendRequest = async () => {
        return await axios.post("http://localhost:5000/login", {
            gmail: user.gmail,
            password: user.password,
        })
            .then((res) => res.data);
    };

    const validateOTP = async (otp, user) => {
        return await axios.post("http://localhost:5000/validate-otp", {
            otp: otp,
            gmail: user.gmail, // Include the user ID in the request
        })
            .then((res) => res.data);
    };

    return (
        <div>
            <Navbar/>
            
            <div className="login-container">
                <h1>User Login</h1>
                <form onSubmit={showOTPInput ? handleOTPSubmit : handleSubmit}>
                    {!showOTPInput && (
                        <>
                            <label>Gmail</label>
                            <input type="email" value={user.gmail} onChange={handleInputChange} name="gmail" required />
                            <label>Password</label>
                            <input type="password" value={user.password} onChange={handleInputChange} name="password" required />
                        </>
                    )}
                    {/* OTP input field */}
                    {showOTPInput && (
                        <>
                            <label>OTP</label>
                            <input type="text" value={otp} onChange={handleOTPChange} name="otp" required />
                        </>
                    )}
                    <button>{showOTPInput ? "Submit OTP" : "Login"}</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default Login;