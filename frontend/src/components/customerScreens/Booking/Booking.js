import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Booking(props) {
    const { _id, customerName, serviceProviderName, serviceProviderId, serviceType, hourlyRate, appointmentDate, appointmentTime, address, request } = props.booking;
    const history = useNavigate();
    const [message, setMessage] = useState(""); // State for displaying the success message

    const deleteHandler = async () => {
        // Confirmation dialog
        if (window.confirm("Are you sure you want to delete this booking?")) {
            try {
                const response = await axios.delete(`http://localhost:5000/bookings/${_id}`);
                setMessage("Delete booking successful."); // Set success message
                setTimeout(() => {
                    history("/bookingdetails"); // Redirect to home page (change this URL to wherever you'd like the user to go after deletion)
                }, 2000); // Redirect after 2 seconds
            } catch (err) {
                console.error('Error deleting the booking:', err);
                setMessage("Failed to delete booking."); // Set failure message
            }
        }
    };

    const styles = {
        container: {
            margin: '20px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        th: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
            backgroundColor: '#f4f4f4',
        },
        td: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
        },
        linkButton: {
            marginTop: '10px',
            padding: '5px 10px',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            textDecoration: 'none',
            display: 'inline-block',
        },
        deleteButton: {
            backgroundColor: '#dc3545',
            cursor: 'pointer',
        }
    };

    return (
        <div style={styles.container}>
            
            {message && <div style={{ color: "green", textAlign: "center", marginBottom: "10px" }}>{message}</div>}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Detail</th>
                        <th style={styles.th}>Information</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style={styles.td}>Customer Name</td><td style={styles.td}>{customerName}</td></tr>
                    <tr><td style={styles.td}>Service Provider Name</td><td style={styles.td}>{serviceProviderName}</td></tr>
                    <tr><td style={styles.td}>Service Provider ID</td><td style={styles.td}>{serviceProviderId}</td></tr>
                    <tr><td style={styles.td}>Service Type</td><td style={styles.td}>{serviceType}</td></tr>
                    <tr><td style={styles.td}>Hourly Rate</td><td style={styles.td}>{hourlyRate}</td></tr>
                    <tr><td style={styles.td}>Appointment Date</td><td style={styles.td}>{appointmentDate}</td></tr>
                    <tr><td style={styles.td}>Appointment Time</td><td style={styles.td}>{appointmentTime}</td></tr>
                    <tr><td style={styles.td}>Address</td><td style={styles.td}>{address}</td></tr>
                    <tr><td style={styles.td}>Request</td><td style={styles.td}>{request}</td></tr>
                </tbody>
            </table>
            <Link to={`/bookingdetails/${_id}`} style={{...styles.linkButton, marginRight: '10px'}}>Update</Link>
            <button onClick={deleteHandler} style={{...styles.linkButton, ...styles.deleteButton}}>Delete</button>
        </div>
    );
}

export default Booking;
