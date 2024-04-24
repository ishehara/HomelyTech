import React, { useState } from 'react'; // Corrected import statement
import './AddPayment.css';
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
        // <div>
        //     <Navbar/>
        <div>
            
            <h1 className='AddPayment h1'>Make Payment</h1>
            <form onSubmit={handleSubmit} className='AddPayment form'>
                <label className='AddPayment label' htmlFor="fname">Full Name:</label><br />
                <input type="text" id="fname" name="fname" onChange={handleChange} value={inputs.fname} required/><br />

                <label className='AddPayment label' htmlFor="fname">User ID:</label><br />
                <input type="text" id="userid" name="userid" onChange={handleChange} value={inputs.userid} required/><br />

                <label className='AddPayment label'  htmlFor="gmail">Gmail:</label><br />
                <input className='AddPayment input[type="email"]' type="email" id="gmail" name="gmail" required onChange={handleChange} value={inputs.gmail} /><br />

                <label className='AddPayment label'  htmlFor="address">Address:</label><br />
                <input className='AddPayment input[type="text"]'  type="text" id="address" name="address" required onChange={handleChange} value={inputs.address} /><br />

                <label className='AddPayment label'  htmlFor="phone">Phone:</label><br />
                <input  className='AddPayment input[type="tel"]'  type="tel" id="phone" name="Phone" required onChange={handleChange} value={inputs.Phone} /><br />

                <label className='AddPayment label'  htmlFor="serviceType">Service Type:</label><br />
                <input className='AddPayment input[type="text"]'  type="text" id="serviceType "  required name="ServiceType" onChange={handleChange} value={inputs.ServiceType} /><br />

                <label className='AddPayment label'  htmlFor="amount">Amount:</label><br />
                <input className='AddPayment input[type="number"]' type="number" id="amount" required name="amount" onChange={handleChange} value={inputs.amount} /><br />

                <label className='AddPayment label'  htmlFor="paymentSlip">Payment Slip:</label><br />
                <input className='AddPayment input[type="text"]' type="text" id="paymentSlip" required name="PaymentSlip" onChange={handleChange} value={inputs.PaymentSlip} /><br /><br />

                <button type="submit" className='AddPayment button'>Submit</button>
            </form>
            </div>
        //     <Footer/>
        // </div>
    );
}

export default AddPayment;