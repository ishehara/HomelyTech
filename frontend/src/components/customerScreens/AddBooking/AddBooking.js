import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Footer from '../Footer/footer';
import Navbar from '../navbar';

function AddBooking() {
    const history = useNavigate();
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
        if (e.target.name === "serviceType") {
            const rate = serviceOptions[e.target.value];
            setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
                hourlyRate: rate || ''
            }));
        } else {
            setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history('/bookingdetails'));
    };

    const sendRequest = async () => {
        return axios.post("http://localhost:5000/bookings", {
            ...inputs
        }).then(res => res.data);
    }

    const styles = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            margin: '0 auto'
        },
        label: {
            marginBottom: '5px',
            fontWeight: 'bold'
        },
        input: {
            marginBottom: '10px',
            padding: '8px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc'
        },
        select: {
            marginBottom: '10px',
            padding: '8px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc'
        },
        button: {
            padding: '10px 20px',
            color: 'white',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }
    };

    return (
        <div>
            <Navbar/>

            <h1>Add Booking</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>Customer Name:</label>
                <input style={styles.input} type="text" name="customerName" onChange={handleChange} value={inputs.customerName} required />
                
                <label style={styles.label}>Service Provider Name:</label>
                <input style={styles.input} type="text" name="serviceProviderName" onChange={handleChange} value={inputs.serviceProviderName} required />
                
                <label style={styles.label}>Service Provider ID:</label>
                <input style={styles.input} type="text" name="serviceProviderId" onChange={handleChange} value={inputs.serviceProviderId} required />
                
                <label style={styles.label}>Service Type:</label>
                <select style={styles.select} name="serviceType" onChange={handleChange} value={inputs.serviceType} required>
                    <option value="">Select a service</option>
                    {Object.keys(serviceOptions).map(service => (
                        <option key={service} value={service}>{service}</option>
                    ))}
                </select>
                
                <label style={styles.label}>Hourly Rate:</label>
                <input style={styles.input} type="number" name="hourlyRate" value={inputs.hourlyRate} readOnly />
                
                <label style={styles.label}>Appointment Date:</label>
                <input style={styles.input} type="date" name="appointmentDate" onChange={handleChange} value={inputs.appointmentDate} required />
                
                <label style={styles.label}>Appointment Time:</label>
                <input style={styles.input} type="time" name="appointmentTime" onChange={handleChange} value={inputs.appointmentTime} required />
                
                <label style={styles.label}>Address:</label>
                <input style={styles.input} type="text" name="address" onChange={handleChange} value={inputs.address} required />
                
                <label style={styles.label}>Request:</label>
                <input style={styles.input} type="text" name="request" onChange={handleChange} value={inputs.request} required />
                
                <button type="submit" style={styles.button}>Checkout</button>
            </form>
            <Footer/>
        </div>
    );
}

export default AddBooking;
