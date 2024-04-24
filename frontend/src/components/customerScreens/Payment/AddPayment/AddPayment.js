import React, { useState } from 'react'; // Corrected import statement
import './AddPayment.css';
import Navbar from '../../navbar'
import Footer from '../../Footer/footer'

// import Nav from '../Nav/nav';
import { useNavigate } from 'react-router';
import axios from 'axios';
// import Navbar from '../../navbar';
// import Footer from '../../Footer/footer';

function AddPayment() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({ // Corrected UseState to useState
        fname: '',
        userid:'',
        gmail: '',
        address: '',
        Phone: '',
        ServiceType: '',
        amount: '',
        PaymentSlip: ''
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Corrected preventDefault
        console.log(inputs);
        sendRequest().then(() => history('/home'));
    };

    const sendRequest = async () => {
        await axios.post('http://localhost:5000/payments', {
            fname: String(inputs.fname),
            userid: String(inputs.userid),
            gmail: String(inputs.gmail),
            address: String(inputs.address),
            Phone: Number(inputs.Phone),
            ServiceType: String(inputs.ServiceType),
            amount: Number(inputs.amount),
            PaymentSlip: String(inputs.PaymentSlip)
        }).then(res => res.data);
    };

    return (
        <div>
            <Navbar/>
            <h1 className='AddPayment-h3'>Take the Next Step by Providing Payment Information to Complete the Order</h1>
        <div>
            
            
            <div className='container-payment' >
            <form onSubmit={handleSubmit} className='AddPayment form'>
                <label className='AddPayment-label' htmlFor="fname">Full Name:</label>
                <input type="text" id="fname" name="fname" onChange={handleChange} value={inputs.fname} required/>

                <label className='AddPayment-label' htmlFor="fname">User ID:</label>
                <input type="text" id="userid" name="userid" onChange={handleChange} value={inputs.userid} required/>

                <label className='AddPayment-label'  htmlFor="gmail">Gmail:</label>
                <input className='AddPayment input[type="email"]' type="email" id="gmail" name="gmail" required onChange={handleChange} value={inputs.gmail} />

                <label className='AddPayment-label'  htmlFor="address">Address:</label>
                <input className='AddPayment input[type="text"]'  type="text" id="address" name="address" required onChange={handleChange} value={inputs.address} />

                <label className='AddPayment-label'  htmlFor="phone">Phone:</label>
                <input  className='AddPayment input[type="tel"]'  type="tel" id="phone" name="Phone" required onChange={handleChange} value={inputs.Phone} />

                <label className='AddPayment-label'  htmlFor="serviceType">Service Type:</label>
                <input className='AddPayment input[type="text"]'  type="text" id="serviceType "  required name="ServiceType" onChange={handleChange} value={inputs.ServiceType} />

                <label className='AddPayment-label'  htmlFor="amount">Amount:</label>
                <input className='AddPayment input[type="number"]' type="number" id="amount" required name="amount" onChange={handleChange} value={inputs.amount} />

                <label className='AddPayment-label'  htmlFor="paymentSlip">PaymentSlip Reference Number:</label>
                <input className='AddPayment input[type="text"]' type="text" id="paymentSlip" required name="PaymentSlip" onChange={handleChange} value={inputs.PaymentSlip} />

                <button type="submit" className='AddPayment-button'>Submit</button>
            </form>
            </div>
            </div>
            <Footer/> 
       </div>
    );
}

export default AddPayment;