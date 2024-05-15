import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import './AddPayment.css';
import Navbar from '../../navbar';
import Footer from '../../Footer/footer';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

function AddPayment() {
    const { hourlyRate } = useParams(); // Get hourlyRate from URL parameters
    const Status = 'Pending';
    const navigator = useNavigate();
    const [inputs, setInputs] = useState({
        fname: '',
        userid: '',
        gmail: '',
        address: '',
        Phone: '',
        ServiceType: '',
        amount: hourlyRate || '', // Set amount to hourlyRate
        promo:'',
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

    const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/offer");
        setOffers(response.data.offers);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  let myoffer = offers.filter(o => o.promoCode == inputs.promo)

  console.log(myoffer);

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
        await axios.post('http://localhost:5000/payments', {
            fname: String(inputs.fname),
            userid: String(inputs.userid),
            gmail: String(inputs.gmail),
            address: String(inputs.address),
            Phone: Number(inputs.Phone),
            ServiceType: String(inputs.ServiceType),
            amount: Number(inputs.amount),
            promo: String(inputs.promo),
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
                background: 'black',
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
                    navigator('/makePayment');
                }, 2500);
            }, 2500);
        }, 5000);
    };

    return (
        <div>
            <Toaster />
            <Navbar />
            <h1 className='AddPayment-h3'>Take the Next Step by Providing Payment Information to Complete the Order</h1>
            <div className='container-payment'>
                <form onSubmit={handleSub} className='AddPayment form'>
                    <label className='AddPayment-label' htmlFor="fname">Full Name:</label>
                    <input type="text" id="fname" name="fname" onChange={handleChange} value={inputs.fname} required />

                    <label className='AddPayment-label' htmlFor="fname">User ID:</label>
                    <input type="text" id="userid" name="userid" onChange={handleChange} value={inputs.userid} required />

                    <label className='AddPayment-label' htmlFor="gmail">Gmail:</label>
                    <input className={`AddPayment input[type="email"] ${errors.gmail && 'error'}`} type="email" id="gmail" name="gmail" required onChange={handleChange} value={inputs.gmail} />
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

                    <label className='AddPayment-label' htmlFor="fname">Promo Code:</label>
                    <input type="text" id="promo" name="promo" onChange={handleChange} value={inputs.promo} required />
                    {myoffer.length != 0 ? <label style={{ color: 'green' }} className='AddPayment-label' >Discounted Amount : {inputs.amount - inputs.amount * myoffer[0].persentage / 100}</label> : null }
                    { inputs.promo != "" && myoffer.length == 0 ? <label className='AddPayment-label' style={{ color: "red" }}>Invalide Promocode</label> : null }

                    <label className='AddPayment-label' htmlFor="paymentSlip">PaymentSlip Reference Number:</label>
                    <input className='AddPayment input[type="text"]' type="text" id="paymentSlip" required name="PaymentSlip" onChange={handleChange} value={inputs.PaymentSlip} />

                    <button type="submit" className='AddPayment-button'>Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AddPayment;
