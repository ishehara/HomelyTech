// ServiceProviderDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';
import { Link } from 'react-router-dom'; // Import Link component
import { useNavigate } from 'react-router-dom';

const ServiceProviderDetails = () => {
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/sproviders/${provider._id}`);
      // Show alert to inform the user about account deletion
      alert('Your account has been deleted.');
      sessionStorage.clear();
        // Redirect to login page
      navigate('/log');
    } catch (error) {
      console.error('Error deleting service provider:', error);
    }
  };


  return (
    <div>
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

          {/* Use Link for navigation */}
          <Link to={{ pathname: `/update-service-provider/${provider._id}`, state: { provider } }}>Update</Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>Loading service provider details...</p>
      )}
    </div>
  );
};

export default ServiceProviderDetails;
