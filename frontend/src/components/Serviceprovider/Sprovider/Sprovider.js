import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import './Sproviders.css'; // Import CSS file for styling
import Footer from '../../customerScreens/Footer/footer';
import { Link } from 'react-router-dom'; // Import Link component for navigation

function Sproviders() {
  const [sproviders, setSproviders] = useState([]);

  useEffect(() => {
    async function fetchSproviders() {
      try {
        const response = await axios.get('http://localhost:5000/sproviders');
        setSproviders(response.data.sproviders);
      } catch (error) {
        console.error('Error fetching service providers:', error);
      }
    }

    fetchSproviders();
  }, []);

  const handleDelete = async (id) => {
    try {
      //console.log("id", id);
      await axios.delete(`http://localhost:5000/sproviders/${id}`);
      // Update the service providers list after deletion
      setSproviders(sproviders.filter(sprovider => sprovider._id !== id));
      alert(`Service Provider account has been deleted. Provider ID: ${id}`);
    } catch (error) {
      console.error('Error deleting service provider:', error);
    }
  };

  return (
    <div className="sproviders-container">
      <h1>Service Providers</h1>
      {sproviders.length === 0 ? (
        <p>No service providers found</p>
      ) : (
        <div className="sproviders-list">
          {sproviders.map((sprovider) => (
            <div key={sprovider._id} className="sprovider-card">
              <p><strong>ID:</strong> {sprovider._id}</p>
              <p><strong>Username:</strong> {sprovider.username}</p>
              <p><strong>Gmail:</strong> {sprovider.gmail}</p>
              <p><strong>Full Name:</strong> {sprovider.fullname}</p>
              <p><strong>Password:</strong> {sprovider.password}</p>
              <p><strong>Phone Number:</strong> {sprovider.phonenumber}</p>
              <p><strong>Service Type:</strong> {sprovider.servicetype}</p>
              <p><strong>Service Areas:</strong> {sprovider.serviceareas}</p>
              <p><strong>User Level:</strong> {sprovider.userLevel}</p>
              {/* Add more fields as needed */}
              <Link to={`/update-service-provider/${sprovider._id}`} className="update-button">Update</Link>
              <button onClick={() => handleDelete(sprovider._id)} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      )}
      <Footer/>
    </div>
  );
}

export default Sproviders;
