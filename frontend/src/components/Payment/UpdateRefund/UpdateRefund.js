import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UpdateRefund.css'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Navbar from "../../navbar/navbar"; // Adjusted import path

function UpdateRefund() {
    const [inputs, setInputs] = useState({
        fname: '',
        gmail: '',
        address: '',
        Phone: '',
        ServiceType: '',
        amount: '',
        PaymentSlip: '',
        Status:''
    });
    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/refund/${id}`);
                const data = response.data;
                setInputs(data.refund || {}); // Provide default value in case data.refund is undefined
            } catch (error) {
                console.error('Error fetching refund data:', error);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5000/refund/${id}`, {
                fname: String(inputs.fname),
                gmail: String(inputs.gmail),
                address: String(inputs.address),
                Phone: Number(inputs.Phone),
                ServiceType: String(inputs.ServiceType),
                amount: Number(inputs.amount),
                PaymentSlip: String(inputs.PaymentSlip),
                Status: inputs.Status 
            });
            history("/refundDetails");
        } catch (error) {
            console.error('Error updating refund:', error);
        }
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
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
                <h1 className='AddPayment-h1'>Update Refund</h1>
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

        
                    <label className='AddPayment-label'  htmlFor="paymentSlip">Reason:</label><br />
                    <input className='AddPayment input[type="text"]' type="text" id="reason" name="reason" required  onChange={handleChange} value={inputs.reason} /><br /><br />

                    <label className='AddPayment-label'  htmlFor="paymentSlip">Payment Slip:</label><br />
                    <input className='AddPayment input[type="text"]' type="text" id="paymentSlip" name="PaymentSlip" required  onChange={handleChange} value={inputs.PaymentSlip} /><br /><br />

                    <label className='AddPayment-label'  htmlFor="status">Status:</label><br />
                    <input className='AddPayment input[type="text"]' type="text" id="status" name="Status" required  onChange={handleChange} value={inputs.Status} /><br /><br />


                    <button type="submit" className='AddPayment-button'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateRefund;
