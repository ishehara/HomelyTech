import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import '.../UpdatePayment.css';
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
        PaymentSlip: ''
    });
    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            await axios
                .get(`http://localhost:5000/refund/${id}`)
                .then((res) => res.data)
                .then((data) => setInputs(data.user || {})); // Provide default value in case data.user is undefined
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        await axios
            .put(`http://localhost:5000/refund/${id}`, {
                fname: String(inputs.fname),
                gmail: String(inputs.gmail),
                address: String(inputs.address),
                Phone: Number(inputs.Phone),
                ServiceType: String(inputs.ServiceType),
                amount: Number(inputs.amount),
                PaymentSlip: String(inputs.PaymentSlip)
            }).then(res => res.data);

    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() =>
            history("/refundDetails")
        );
    };

    return (
        <div>
            <Navbar/>
        <div>
            <h1 className='AddPayment h1'>Update User</h1>
            <form onSubmit={handleSubmit} className='AddPayment form'>
                <label className='AddPayment label' htmlFor="fname">Full Name:</label><br />
                <input type="text" id="fname" name="fname" onChange={handleChange} value={inputs.fname} required /><br />

                <label className='AddPayment label'  htmlFor="gmail">Gmail:</label><br />
                <input className='AddPayment input[type="email"]' type="email" id="gmail" name="gmail" required onChange={handleChange} value={inputs.gmail} /><br />

                <label className='AddPayment label'  htmlFor="address">Address:</label><br />
                <input className='AddPayment input[type="text"]'  type="text" id="address" name="address"  required onChange={handleChange} value={inputs.address} /><br />

                <label className='AddPayment label'  htmlFor="phone">Phone:</label><br />
                <input  className='AddPayment input[type="tel"]'  type="tel" id="phone" name="Phone" required   onChange={handleChange} value={inputs.Phone} /><br />

                <label className='AddPayment label'  htmlFor="serviceType">Service Type:</label><br />
                <input className='AddPayment input[type="text"]'  type="text" id="serviceType" name="ServiceType" required  onChange={handleChange} value={inputs.ServiceType} /><br />

                <label className='AddPayment label'  htmlFor="amount">Amount:</label><br />
                <input className='AddPayment input[type="number"]' type="number" id="amount" name="amount" required  onChange={handleChange} value={inputs.amount} /><br />

                <label className='AddPayment label'  htmlFor="paymentSlip">Payment Slip:</label><br />
                <input className='AddPayment input[type="text"]' type="text" id="paymentSlip" name="PaymentSlip" required  onChange={handleChange} value={inputs.PaymentSlip} /><br /><br />

                <button type="submit" className='AddPayment button'>Submit</button>

               
            </form>
            
            
        </div>
        </div>
    );
}

export default UpdatePayment;
