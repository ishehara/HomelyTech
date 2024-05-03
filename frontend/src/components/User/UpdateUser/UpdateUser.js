import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Navbar from '../../customerScreens/navbar';

function UpdateUser() {
  const [inputs, setInputs] = useState({
    username: '',
    gmail: '',
    password: '',
    fullname: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        const user = response.data.users;
        setInputs(user); // Set the inputs state with fetched user data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${id}`, inputs);
      history("/normalUserDetails");

      const isAdmin = sessionStorage.getItem('isAdmin');
      if (isAdmin === 'true') {
        history("/userdetails");

      } else {


      }
    
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar/>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
      <label>UserName</label>
      <br></br>
      <input type="text" value={inputs.username} onChange={handleChange} name="username" required></input><br></br><br></br>
      <label>Gmail</label>
      <br></br>
      <input type="email" value={inputs.gmail} onChange={handleChange} name="gmail" required></input><br></br><br></br>
      <label>Password</label>
      <br></br>
      <input type="password" value={inputs.password} onChange={handleChange} name="password" required></input><br></br><br></br>
      <label>FullName</label>
      <br></br>
      <input type="text" value={inputs.fullname} onChange={handleChange} name="fullname" required></input><br></br><br></br>
      <label>Address</label>
      <br></br>
      <input type="text" value={inputs.address} onChange={handleChange} name="address" required></input><br></br><br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdateUser;