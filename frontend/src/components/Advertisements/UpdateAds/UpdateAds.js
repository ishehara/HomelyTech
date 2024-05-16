import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';

function UpdateAds() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
        await axios.get(`http://localhost:5000/ads/${id}`)
        .then((res)=>res.data)
        .then((data)=>setInputs(data.ad));
       
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
      await axios.put(`http://localhost:5000/ads/${id}`, {
        adTitle: String(inputs.adTitle),
        serviceType: String(inputs.serviceType),
        reqDate: String(inputs.reqDate),
        noOfDays: parseInt(inputs.noOfDays),
        area: String(inputs.area),
        adDescription: String(inputs.adDescription),
        contactNumber: String(inputs.contactNumber),
        email: String(inputs.email),
        date: new Date(inputs.date),
      })
    .then((res)=>res.data);
  }

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
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then(() => {
        history("/advertisementdetails");
        alert("Advertisement updated successfully!");
      })
      .catch((error) => console.error("Error updating ad:", error));
};

    // Get today's date in the format "YYYY-MM-DD"
    const today = new Date().toISOString().split('T')[0];

  return (
    <div>


      <Navbar/>
        
    
          <div className="Adform-container">

          <h1>Update Your Advertisement</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="adTitle">Ad Title:</label><br />
        <input type="text" id="adTitle" name="adTitle" onChange={handleChange} value={inputs.adTitle} required /><br />
        <label htmlFor="serviceType">Service Type:</label><br />
        <input type="text" id="serviceType" name="serviceType" onChange={handleChange} value={inputs.serviceType} required /><br />
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
        <input type="date" id="date" name="date" onChange={handleChange} value={inputs.date ? inputs.date.slice(0, 10) : ""} disabled /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
    <Footer/>
  </div>
 
  );
}

export default UpdateAds;

