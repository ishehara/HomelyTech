import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UpdatePayment.css';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Navbar from "../../navbar/navbar"; // Adjusted import path

function UpdatePayment() {
    const [inputs, setInputs] = useState({
        fname: '',
        gmail: '',
        address: '',
        Phone: '',
        ServiceType: '',
        amount: '',
        PaymentSlip: '',
        Status: ''
    });
    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/payments/${id}`);
                const data = response.data.payment; // Assuming data is an object containing the fields you want to display
                setInputs(data);
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5000/payments/${id}`, inputs);
            history("/paymentdetails");
        } catch (error) {
            console.error('Error updating payment:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest();
    };

    return (
        <div>
            <Navbar/>
            <div>
                <br/><br/>
                <h1 className='AddPayment-h1'>Update Payment</h1>
                <form onSubmit={handleSubmit} className='AddPayment form'>
                    <label className='AddPayment-label' htmlFor="fname">Full Name:</label><br />
                    <input type="text" id="fname" name="fname" onChange={handleChange} value={inputs.fname} required /><br />

                    <label className='AddPayment-label'  htmlFor="gmail">Gmail:</label><br />
                    <input className='AddPayment input[type="email"]' type="email" id="gmail" name="gmail" required onChange={handleChange} value={inputs.gmail} /><br />

                    <label className='AddPayment-label'  htmlFor="address">Address:</label><br />
                    <input className='AddPayment input[type="text"]'  type="text" id="address" name="address"  required onChange={handleChange} value={inputs.address} /><br />

                    <label className='AddPayment-label'  htmlFor="phone">Phone:</label><br />
                    <input  className='AddPayment input[type="tel"]'  type="tel" id="phone" name="Phone" required   onChange={handleChange} value={inputs.Phone} /><br />

                    <label className='AddPayment-label'  htmlFor="serviceType">Service Type:</label><br />
                    <input className='AddPayment input[type="text"]'  type="text" id="serviceType" name="ServiceType" required  onChange={handleChange} value={inputs.ServiceType} /><br />

                    <label className='AddPayment-label'  htmlFor="amount">Amount:</label><br />
                    <input className='AddPayment input[type="number"]' type="number" id="amount" name="amount" required  onChange={handleChange} value={inputs.amount} /><br />

                    <label className='AddPayment-label'  htmlFor="paymentSlip">Payment Slip Reference Number:</label><br />
                    <input className='AddPayment input[type="text"]' type="text" id="paymentSlip" name="PaymentSlip" required  onChange={handleChange} value={inputs.PaymentSlip} /><br /><br />

                    <label className='AddPayment-label'  htmlFor="status">Status:</label><br />
                   
<select className='AddPayment input' id="status" name="Status" required onChange={handleChange} value={inputs.Status}>
  <option value="">Select Status</option>
  <option value="Approved">Approved</option>
  <option value="Rejected">Rejected</option>
  <option value="Approved">Pending</option>
</select><br></br>
<br></br>
                    <button type="submit" className='AddPayment-button'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePayment;
