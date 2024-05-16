import React, { useState } from 'react';
//import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';

function ServiceLogin() {
    const history = useNavigate();
    const [provider, setProvider] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProvider((prevProvider) => ({ ...prevProvider, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await sendRequest();
            if (response.status === 200 && response.data.status === "ok") { // Check for successful status and "ok" status from server
                alert("Login success");
                sessionStorage.setItem('isLoggedIn', true);
                sessionStorage.setItem('providerId', response.data.provider._id); // Set providerId in sessionStorage
                history("/serviceProviderDetails");
            } else {
                alert("Login error");
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const sendRequest = async () => {
        return await axios.post("http://localhost:5000/sproviders/login", { // Adjusted endpoint to match server-side route
            username: provider.username,
            password: provider.password,
        });
    };

    return (
        <div>
            <Navbar />
            <div className="login-container">
                <h1>Service Provider Login</h1>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" value={provider.username} onChange={handleInputChange} name="username" required />
                    <label>Password</label>
                    <input type="password" value={provider.password} onChange={handleInputChange} name="password" required />
                    <button>Login</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default ServiceLogin;
