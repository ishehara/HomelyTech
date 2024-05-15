import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import Footer from '../Footer/footer';
import Navbar from '../navbar';
import Bgvideo from '../../../media/videoBg.mp4';

function UpdateBooking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        customerName: '',
        serviceProviderName: '',
        serviceProviderId: '',
        serviceType: '',
        hourlyRate: '',
        appointmentDate: '',
        appointmentTime: '',
        address: '',
        request: ''
    });

    const [validationMessages, setValidationMessages] = useState({
        customerName: '',
        serviceProviderName: '',
        appointmentDate: '',
        appointmentTime: ''
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

    useEffect(() => {
        axios.get(`http://localhost:5000/bookings/${id}`)
            .then(response => setInputs(response.data))
            .catch(error => console.error('Error fetching booking details:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const currentDateTime = new Date();
        const currentDate = currentDateTime.toISOString().split('T')[0];
        const currentTime = currentDateTime.toTimeString().split(':')[0] + ":" + currentDateTime.toTimeString().split(':')[1];

        let newValidationMessages = { ...validationMessages };

        if (name === "serviceType") {
            const rate = serviceOptions[value];
            setInputs(prevState => ({ ...prevState, [name]: value, hourlyRate: rate || '' }));
        } else if (name === "appointmentDate") {
            if (value < currentDate) {
                newValidationMessages.appointmentDate = 'Appointment date cannot be in the past.';
            } else {
                newValidationMessages.appointmentDate = '';
            }
        } else if (name === "appointmentTime" && inputs.appointmentDate === currentDate) {
            if (value < currentTime) {
                newValidationMessages.appointmentTime = 'Appointment time cannot be in the past.';
            } else {
                newValidationMessages.appointmentTime = '';
            }
        } else if ((name === "customerName" || name === "serviceProviderName") && !/^[a-zA-Z\s]*$/.test(value)) {
            newValidationMessages[name] = 'Only letters and spaces are allowed.';
        } else {
            newValidationMessages[name] = '';
        }

        setInputs(prevState => ({ ...prevState, [name]: value }));
        setValidationMessages(newValidationMessages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/bookings/${id}`, inputs)
            .then(() => {
                alert('Booking updated successfully');
                navigate('/bookingdetails');
            })
            .catch(err => alert('Failed to update booking: ' + err.message));
    };

    const videoContainerStyle = {
        position: 'relative',
        width: '100%',
        height: '120vh', // Set to full viewport height
        overflow: 'hidden'
    };

    const videoStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1
    };

    const overlayStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for text readability
        top: 0,
        left: 0,
        zIndex: 0
    };

    const upBookformContainerStyle = {
        position: 'absolute',
        top: '79%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '500px',
        padding: '30px',
        backgroundColor: '#d6d5f0', // Changed from background-color
        border: 'none',
        borderRadius: '20px', // Changed from border-radius
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // Changed from box-shadow
        zIndex: 1 // Changed from z-index
    };
    

    const labelStyle = {
        marginBottom: '5px',
        color: '#12498c',
        textAlign: 'left'
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        margin: '5px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box'
    };

    const submitButtonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#052659',
        color: '#C1E8FF',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    };

    const headingStyle = {
        color: '#052659',
        textShadow: '1px 1px #021024',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        fontSize: '24px'
    };

    return (
        <>
            <Navbar />
            <div className="video-container">
                <video src={Bgvideo} autoPlay muted loop className="video-bg"></video>
                <div className="bg-overlay"></div>
            </div>
            <div style={upBookformContainerStyle}>
            <h1 style={headingStyle}>Update Your Booking</h1>
                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                    <label style={labelStyle}>Customer Name:</label>
                    <input style={inputStyle} type="text" name="customerName" onChange={handleChange} value={inputs.customerName} required />
                    {validationMessages.customerName && <div style={{ color: 'red', marginBottom: '10px' }}>{validationMessages.customerName}</div>}
                    
                    <label style={labelStyle}>Service Provider Name:</label>
                    <input style={inputStyle} type="text" name="serviceProviderName" onChange={handleChange} value={inputs.serviceProviderName} required />
                    {validationMessages.serviceProviderName && <div style={{ color: 'red', marginBottom: '10px' }}>{validationMessages.serviceProviderName}</div>}
                    
                    <label style={labelStyle}>Service Provider ID:</label>
                    <input style={inputStyle} type="text" name="serviceProviderId" onChange={handleChange} value={inputs.serviceProviderId} required />
                    
                    <label style={labelStyle}>Service Type:</label>
                    <select style={inputStyle} name="serviceType" onChange={handleChange} value={inputs.serviceType} required>
                        <option value="">Select a service</option>
                        {Object.keys(serviceOptions).map(service => (
                            <option key={service} value={service}>{service}</option>
                        ))}
                    </select>
                    
                    <label style={labelStyle}>Hourly Rate:</label>
                    <input style={inputStyle} type="number" name="hourlyRate" value={inputs.hourlyRate} readOnly />
                    
                    <label style={labelStyle}>Appointment Date:</label>
                    <input style={inputStyle} type="date" name="appointmentDate" onChange={handleChange} value={inputs.appointmentDate} required />
                    {validationMessages.appointmentDate && <div style={{ color: 'red', marginBottom: '10px' }}>{validationMessages.appointmentDate}</div>}
                    
                    <label style={labelStyle}>Appointment Time:</label>
                    <input style={inputStyle} type="time" name="appointmentTime" onChange={handleChange} value={inputs.appointmentTime} required />
                    {validationMessages.appointmentTime && <div style={{ color: 'red', marginBottom: '10px' }}>{validationMessages.appointmentTime}</div>}
                    
                    <label style={labelStyle}>Address:</label>
                    <textarea style={inputStyle} name="address" onChange={handleChange} value={inputs.address} required />
                    
                    <label style={labelStyle}>Request:</label>
                    <textarea style={inputStyle} name="request" onChange={handleChange} value={inputs.request} />
                    
                    <button type="submit" style={submitButtonStyle}>Update Booking</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default UpdateBooking;
