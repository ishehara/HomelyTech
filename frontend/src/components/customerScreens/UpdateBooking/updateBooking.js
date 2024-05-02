import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateBooking() {
    const [booking, setBooking] = useState({
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

    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            await axios.get(`http://Localhost:5000/bookings/${id}`)
            .then((res) => setBooking(res.data));
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        await axios.put(`http://Localhost:5000/bookings/${id}`, {
            ...booking
        }).then((res) => res.data);
    };

    const handleChange = (e) => {
        setBooking(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to update this booking?')) {
            sendRequest()
            .then(() => {
                alert('Booking successfully updated');
                history("/bookingdetails");
            })
            .catch((err) => {
                alert('Failed to update booking: ' + err.message);
            });
        }
    };

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
            <h1>Update Booking</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>Customer Name:</label>
                <input style={styles.input} type="text" name="customerName" onChange={handleChange} value={booking.customerName} required />

                <label style={styles.label}>Service Provider Name:</label>
                <input style={styles.input} type="text" name="serviceProviderName" onChange={handleChange} value={booking.serviceProviderName} required />

                <label style={styles.label}>Service Provider ID:</label>
                <input style={styles.input} type="text" name="serviceProviderId" onChange={handleChange} value={booking.serviceProviderId} required />

                <label style={styles.label}>Service Type:</label>
                <input style={styles.input} type="text" name="serviceType" onChange={handleChange} value={booking.serviceType} required />

                <label style={styles.label}>Hourly Rate:</label>
                <input style={styles.input} type="number" name="hourlyRate" onChange={handleChange} value={booking.hourlyRate} required />

                <label style={styles.label}>Appointment Date:</label>
                <input style={styles.input} type="date" name="appointmentDate" onChange={handleChange} value={booking.appointmentDate} required />

                <label style={styles.label}>Appointment Time:</label>
                <input style={styles.input} type="time" name="appointmentTime" onChange={handleChange} value={booking.appointmentTime} required />

                <label style={styles.label}>Address:</label>
                <input style={styles.input} type="text" name="address" onChange={handleChange} value={booking.address} required />

                <label style={styles.label}>Request:</label>
                <input style={styles.input} type="text" name="request" onChange={handleChange} value={booking.request} required />

                <button type="submit" style={styles.button}>Update</button>
            </form>
        </div>
    );
}

export default UpdateBooking;
