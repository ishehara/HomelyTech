import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import './AddRefund.css';
import Footer from '../../Footer/footer';
import Navbar from '../../navbar';
import axios from 'axios';

function AddRefund() {
    const navigator = useNavigate();
    const Status = 'Pending';
    const [inputs, setInputs] = useState({
        fname: '',
        userid: '',
        gmail: '',
        address: '',
        Phone: '',
        ServiceType: '',
        amount: '',
        date: '',
        reason: '',
        PaymentSlip: '',
        Status: Status
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
        return phoneRegex.test(phone);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!validateEmail(inputs.gmail)) {
            newErrors.gmail = 'Please enter a valid email address.';
        }

        if (!validatePhone(inputs.Phone)) {
            newErrors.Phone = 'Please enter a valid phone number.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            sendRequest().then();
        }
    };

    const sendRequest = async () => {
        await axios.post('http://localhost:5000/refund', {
            fname: String(inputs.fname),
            userid: String(inputs.userid),
            gmail: String(inputs.gmail),
            address: String(inputs.address),
            Phone: Number(inputs.Phone),
            ServiceType: String(inputs.ServiceType),
            amount: Number(inputs.amount),
            date: Date(inputs.date),
            reason: String(inputs.reason),
            PaymentSlip: String(inputs.PaymentSlip),
            Status: inputs.Status
        }).then(res => res.data);
    };

    const handleSub = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Confirm Payment",
            text: "Are you sure you want to proceed with the payment?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                handleSubmit(e);
                Swal.fire({
                    title: "Payment is Confirmed",
                    icon: "success",
                });
                handleClick2();
            } else {
                Swal.fire({
                    title: "Payment is Canceled",
                    icon: "error",
                });
            }
        });
    };

    const handleClick2 = () => {
        toast.loading('Payment is processing...', {
            style: {
                background: '#021a33',
                color: '#ffffff',
                borderRadius: '10px',
                border: '2px solid #ffffff',
            },
        });

        setTimeout(() => {
            toast.dismiss();
            setTimeout(() => {
                toast.success('Payment is completed!', {
                    style: {
                        background: '#28a745',
                        color: '#ffffff',
                        borderRadius: '10px',
                        border: '2px solid #ffffff',
                    },
                    duration: 2000,
                    iconTheme: {
                        primary: '#ffffff',
                        secondary: '#28a745',
                    },
                });
                setTimeout(() => {
                    navigator('/refundPayment');
                }, 2500);
            }, 2500);
        }, 5000);
    };

    return (
        <div>
            <Toaster />
            <Navbar />
            <h1 className='AddPayment-h3'>Initiate the Process of Returning Funds to the Payee</h1>
            <div className='container-payment'>
                <form onSubmit={handleSub} className='AddPayment form'>
                    <label className='AddPayment-label' htmlFor="fname">Full Name:</label>
                    <input type="text" id="fname" name="fname" onChange={handleChange} value={inputs.fname} required />

                    <label className='AddPayment-label' htmlFor="fname">User ID:</label>
                    <input type="text" id="userid" name="userid" onChange={handleChange} value={inputs.userid} required />

                    <label className='AddPayment-label' htmlFor="gmail">Gmail:</label>
                    <input className={`AddPayment-input[type="email"] ${errors.gmail && 'error'}`} type="email" id="gmail" name="gmail" required onChange={handleChange} value={inputs.gmail} />
                    {errors.gmail && <span className="error">{errors.gmail}</span>}

                    <label className='AddPayment-label' htmlFor="address">Address:</label>
                    <input className='AddPayment input[type="text"]' type="text" id="address" name="address" required onChange={handleChange} value={inputs.address} />

                    <label className='AddPayment-label' htmlFor="phone">Phone:</label>
                    <input className={`AddPayment input[type="tel"] ${errors.Phone && 'error'}`} type="tel" id="phone" name="Phone" required onChange={handleChange} value={inputs.Phone} />
                    {errors.Phone && <span className="error">{errors.Phone}</span>}

                    <label className='AddPayment-label' htmlFor="serviceType">Service Type:</label>
                    <input className='AddPayment input[type="text"]' type="text" id="serviceType " required name="ServiceType" onChange={handleChange} value={inputs.ServiceType} />

                    <label className='AddPayment-label' htmlFor="amount">Amount:</label>
                    <input className='AddPayment input[type="number"]' type="number" id="amount" required name="amount" onChange={handleChange} value={inputs.amount} />

                    <label className='AddPayment-label' htmlFor="amount">Date:</label>
                    <input className='AddPayment input[type="number"]' type="Date" id="date" required name="date" onChange={handleChange} value={inputs.date} /><br />

                    <label className='AddPayment-label' htmlFor="amount">Reason:</label>
                    <input className='AddPayment input[type="number"]' type="text" id="reason" required name="reason" onChange={handleChange} value={inputs.reason} /><br />

                    <label className='AddPayment-label' htmlFor="paymentSlip"> PaymentSlip Reference Number:</label>
                    <input className='AddPayment input[type="text"]' type="text" id="paymentSlip" required name="PaymentSlip" onChange={handleChange} value={inputs.PaymentSlip} /><br /><br />

                    <button type="submit" className='AddPayment-button'>Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AddRefund;
