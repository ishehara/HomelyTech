import React, { useState,useEffect } from 'react';
//import Nav from '../Nav/Nav';
import { useNavigate } from "react-router";
import axios from "axios";
import './AddAd.css';
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';

function AddAd() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        adTitle:'',
        serviceType:'',
        reqDate:'',
        noOfDays:'',
        area:'',
        adDescription: '',
        contactNumber:'',
        email:'',
        date:new Date().toISOString().slice(0,10), // Current date in "YYYY-MM-DD" format
    });

    useEffect(() => {
        // Set the current date when the component mounts
        setInputs(prevState => ({
            ...prevState,
            date: new Date().toISOString().slice(0,10)
        }));
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Validation for phone number: Allow only 10 digits
        if (name === "contactNumber" && !/^\d{0,10}$/.test(value)) {
          // If the entered value is not exactly 10 digits or empty, don't update state
          return;
        }

        setInputs((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        try {
            await sendRequest();
            history('/advertisementdetails');
            alert("Advertisement posted successfully!");
        } catch (error) {
            console.error('Error posting ad:', error);
        }
    };

    const sendRequest = async()=>{
        await axios.post("http://localhost:5000/ads",{
            adTitle: String (inputs.adTitle),
            serviceType: String (inputs.serviceType),
            reqDate: String (inputs.reqDate),
            noOfDays: Number (inputs.noOfDays),
            area: String (inputs.area),
            adDescription: String (inputs.adDescription),
            contactNumber: String (inputs.contactNumber),
            email: String (inputs.email),
            date: Date (inputs.date),
        }).then(res => res.data);
    }

    // Get today's date in the format "YYYY-MM-DD"
    const today = new Date().toISOString().split('T')[0];

    return (
        <div>
            <Navbar/>
            <div>
                <div className="Adform-container">
                    <h1>Post Advertisement!</h1>
                    <form onSubmit={handleSubmit}>  
                        <label htmlFor="adTitle">Ad Title:</label><br />
                        <input type="text" id="adTitle" name="adTitle" onChange={handleChange} value={inputs.adTitle} required /><br />
                        <label htmlFor="serviceType">Service Type:</label><br />
                         <select id="serviceType" name="serviceType" onChange={handleChange} value={inputs.serviceType} required >
                            <option value="">Select Required Service Type</option>
                            <option value="Plumber">Plumber</option>
                            <option value="Electrician">Electrician</option>
                            <option value="Landscaper">Landscaper</option>
                            <option value="Carpenter">Carpenter</option>
                            <option value="Painter">Painter</option>
                            <option value="Construction Laborer">Construction Laborer</option>
                            <option value="Other">Other</option>
                        </select><br/>
                        <label htmlFor="reqDate">Required Date:</label><br />
                        <input type="date" id="reqDate" name="reqDate" onChange={handleChange} value={inputs.reqDate} min={today} required /><br />
                        <label htmlFor="noOfDays">No of Days:</label><br />
                        <input type="number" id="noOfDays" name="noOfDays" onChange={handleChange} value={inputs.noOfDays} min="1" required /><br />
                        <label htmlFor="area">Area:</label><br />
                        <input type="text" id="area" name="area" onChange={handleChange} value={inputs.area} required /><br />
                        <label htmlFor="adDescription">Ad Description:</label><br />
                        <textarea id="adDescription" name="adDescription" onChange={handleChange} value={inputs.adDescription} required /><br />
                        <label htmlFor="contactNumber">Contact Number:</label><br />
                        <input type="tel" id="contactNumber" name="contactNumber" onChange={handleChange} value={inputs.contactNumber} required /><br />
                        <label htmlFor="email">Email:</label><br />
                        <input type="email" id="email" name="email" onChange={handleChange} value={inputs.email} required /><br />
                        <label htmlFor="date">Date:</label><br />
                        <input type="date" id="date" name="date" onChange={handleChange} value={inputs.date} disabled /><br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AddAd;
