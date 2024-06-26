import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/footer';
import Navbar from '../navbar';
import './addvedioBg.css';
import Bgvideo from '../../../media/videoBg.mp4';

function AddBooking() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        customerName: '',
        serviceProviderName: '',
        serviceProviderId: '',  // ensure this is included in form fields and correctly populated
        serviceType: '',
        hourlyRate: '',
        appointmentDate: '',
        appointmentTime: '',
        address: '',
        request: ''
    });
    const [errors, setErrors] = useState({
        customerName: false,
        serviceProviderName: false,
        serviceProviderId: false,  // Added error tracking for serviceProviderId
        appointmentDate: false,
        appointmentTime: false
    });

    const serviceOptions = {
        Plumbing: 1500,
        Technician: 2000,
        Electrician: 1750,
        Carpenter: 1600,
        Painter: 1400,
        Cleaner: 1200,
        Gardener: 1300,
        Mover: 1800,
        HVAC: 1950,
        Decorator: 2100
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const now = new Date();
        const today = now.toISOString().slice(0, 10);

        if (name === "serviceType") {
            const rate = serviceOptions[value];
            setInputs(prevState => ({
                ...prevState,
                [name]: value,
                hourlyRate: rate || ''
            }));
        } else if ((name === "customerName" || name === "serviceProviderName") && !/^[a-zA-Z\s]*$/.test(value)) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: true }));
        } else if (name === "appointmentDate" && value < today) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: true }));
        } else if (name === "appointmentTime" && inputs.appointmentDate === today && value < now.toTimeString().slice(0, 5)) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: true }));
        } else {
            setInputs(prevState => ({
                ...prevState,
                [name]: value,
            }));
            setErrors(prevErrors => ({ ...prevErrors, [name]: false }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).every(v => !v)) {
            // Send booking request
            await sendRequest();
            
            // Navigate to AddPayment component with hourlyRate as amount
            history(`/makePayment/${inputs.hourlyRate}`);
        } else {
            alert("Please correct the errors in the form.");
        }
    };
    

    const sendRequest = async () => {
        return axios.post("http://localhost:5000/bookings", {
            ...inputs
        }).then(res => res.data);
    };

    return (
        <>
            <Navbar />
            <div className="video-container">
                <video src={Bgvideo} autoPlay muted loop className="video-bg"></video>
                <div className="bg-overlay"></div>
            </div>
            <div className="formbooking-container">
                <h1 className="header-style">Book Your Appointment</h1>
                <form onSubmit={handleSubmit}>
                    <label className="label-style">Customer Name:</label>
                    <input className="input-style" type="text" name="customerName" onChange={handleChange} value={inputs.customerName} required />
                    {errors.customerName && <p className="error">Only letters and spaces are allowed.</p>}

                    <label className="label-style">Service Provider Name:</label>
                    <input className="input-style" type="text" name="serviceProviderName" onChange={handleChange} value={inputs.serviceProviderName} required />
                    {errors.serviceProviderName && <p className="error">Only letters and spaces are allowed.</p>}

                    {/* Add a field for selecting or inputting serviceProviderId */}
                    <label className="label-style">Service Provider ID:</label>
                    <input className="input-style" type="text" name="serviceProviderId" onChange={handleChange} value={inputs.serviceProviderId} required />
                    {errors.serviceProviderId && <p className="error">Service Provider ID is required</p>}

                    <label className="label-style">Service Type:</label>
                    <select className="input-style" name="serviceType" onChange={handleChange} value={inputs.serviceType} required>
                        <option value="">Select a Service</option>
                        {Object.keys(serviceOptions).map(service => (
                            <option key={service} value={service}>{service}</option>
                        ))}
                    </select>

                    <label className="label-style">Hourly Rate:</label>
                    <input className="input-style" type="text" name="hourlyRate" value={inputs.hourlyRate} readOnly />

                    <label className="label-style">Appointment Date:</label>
                    <input className="input-style" type="date" name="appointmentDate" onChange={handleChange} value={inputs.appointmentDate} required />
                    {errors.appointmentDate && <p className="error">Appointment date cannot be in the past.</p>}

                    <label className="label-style">Appointment Time:</label>
                    <input className="input-style" type="time" name="appointmentTime" onChange={handleChange} value={inputs.appointmentTime} required />
                    {errors.appointmentTime && <p className="error">Appointment time cannot be in the past.</p>}

                    <label className="label-style">Address:</label>
                    <textarea className="input-style" name="address" onChange={handleChange} value={inputs.address} required />

                    <label className="label-style">Special Requests:</label>
                    <textarea className="input-style" name="request" onChange={handleChange} value={inputs.request} />

                    <button type="submit" className="submit-btn">Book Now</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default AddBooking;
