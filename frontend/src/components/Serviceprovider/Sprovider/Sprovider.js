import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import './Sproviders.css'; // Import CSS file for styling
import Footer from '../../customerScreens/Footer/footer';

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
              <button>Update</button>
              <button>Delete</button>

              {/* <div className="operations">
            <Link to={`/userdetails/${_id}`} className="user-button update-button">Update</Link>
            <button onClick={deleteHandler} className="user-button delete-button">Delete</button>
          </div> */}
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      )}
      <Footer/>
    </div>
  );
}

export default Sproviders;
