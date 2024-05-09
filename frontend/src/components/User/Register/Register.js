import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';
//import './Register.css';

function Register() {    //Insert input data

  const history = useNavigate();
  const [user,setUser] = useState({
    username:"",
    gmail:"",
    password:"",
    fullname:"",
    address:"",
  });

  const handleInputChange =(e) =>{
    const {name,value} = e.target;
    setUser((prevUser) => ({...prevUser,[name]:value}));
  };
  const handleSubmit =(e) => {
    e.preventDefault();

    sendRequest().then((res)=> {
      
        const responseData = res; // Assuming response data is directly available as res.data
        console.log("Response from server:", responseData);
        if (responseData.status === "ok") {
          alert("Register Success");
          history("/log");
        } else if (responseData.status === "error") {
          alert("Failed to register user: " + responseData.message);
        } else {
          alert("Unknown status received from server");
        }
      
  }).catch((err) => {
    alert(err.message);
  });
 };

 const sendRequest = async() =>{
  try {
    const res = await axios.post("http://localhost:5000/register",{
    username:String(user.username),
    gmail:String(user.gmail),
    password:String(user.password),
    fullname:String(user.fullname),
    address:String(user.address),
  });
    return res.data;  // If registration is successful 
}catch (error) {
  throw new Error("Failed to register user"); // If registration fails
}

 };

 return (
  <div>
    <Navbar/>
    <h1>User Register</h1>
    <form onSubmit={handleSubmit}>
      <label>UserName</label>
      <br></br>
      <input type="text" value={user.username} onChange={handleInputChange} name="username" required></input><br></br><br></br>
      <label>Gmail</label>
      <br></br>
      <input type="email" value={user.gmail} onChange={handleInputChange} name="gmail" required></input><br></br><br></br>
      <label>Password</label>
      <br></br>
      <input type="password" value={user.password} onChange={handleInputChange} name="password" required></input><br></br><br></br>
      <label>FullName</label>
      <br></br>
      <input type="text" value={user.fullname} onChange={handleInputChange} name="fullname" required></input><br></br><br></br>
      <label>Address</label>
      <br></br>
      <input type="text" value={user.address} onChange={handleInputChange} name="address" required></input><br></br><br></br>
      <button>Register</button>
    </form>
    <Footer/>
  </div>
)
}

export default Register