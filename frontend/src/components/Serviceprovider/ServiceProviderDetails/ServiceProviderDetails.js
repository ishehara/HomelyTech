// ServiceProviderDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';

const ServiceProviderDetails = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const providerId = sessionStorage.getItem('providerId');
        const response = await axios.get(`http://localhost:5000/sproviders/${providerId}`);
        setProvider(response.data.sprovider);
      } catch (error) {
        console.error('Error fetching service provider details:', error);
      }
    };

    fetchProviderDetails();
  }, []);

  return (
    <div>
      <Navbar/>
      <h1>Service Provider Details</h1>
      {provider ? (
        <div>
          <p>Username: {provider.username}</p>
          <p>Email: {provider.gmail}</p>
          <p>Full Name: {provider.fullname}</p>
          <p>Phone Number: {provider.phonenumber}</p>
          <p>Service Type: {provider.servicetype}</p>
          <p>Service Areas: {provider.serviceareas}</p>
          {/* Add more <p> elements for other details */}
        </div>
      ) : (
        <p>Loading service provider details...</p>
      )}
      <Footer/>
    </div>
  );
};

export default ServiceProviderDetails;
