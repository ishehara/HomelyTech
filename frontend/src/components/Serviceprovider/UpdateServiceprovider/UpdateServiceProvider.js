import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook
import { useNavigate } from 'react-router';

const UpdateServiceProvider = () => {
  const { id } = useParams(); // Access the id parameter from the URL
  const [formData, setFormData] = useState({
    username: '',
    gmail: '',
    fullname: '',
    password: '',
    phonenumber: '',
    servicetype: '',
    serviceareas: '',
  });
  const history = useNavigate();
  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/sproviders/${id}`);
        setFormData(response.data.sprovider);
      } catch (error) {
        console.error('Error fetching service provider details:', error);
      }
    };

    fetchProviderDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/sproviders/${id}`, formData);
      alert('Service provider details updated successfully!');
        

      // Check if isAdmin session item is available
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (isAdmin !== null && isAdmin === 'true') {
            history("/sdetails");
        } else {
            history("/serviceProviderDetails");
        }
    } catch (error) {
      console.error('Error updating service provider details:', error);
      alert('Failed to update service provider details.');
    }
  };

  return (
    <div>
      <h1>Update Service Provider</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="gmail" value={formData.gmail} onChange={handleChange} />
        </div>
        <div>
          <label>Full Name</label>
          <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} />
        </div>
        <div>
          <label>Service Type</label>
          <input type="text" name="servicetype" value={formData.servicetype} onChange={handleChange} />
        </div>
        <div>
          <label>Service Areas</label>
          <input type="text" name="serviceareas" value={formData.serviceareas} onChange={handleChange} />
        </div>
        {/* Add more input fields for other details */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateServiceProvider;
