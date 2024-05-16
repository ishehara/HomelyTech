import React, { useState } from 'react'
//import Nav from '../Nav/Nav'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';

function Sregister() {

  const history = useNavigate();
  const [sprovider,setSprovider] = useState({
    username:"",
    gmail:"",
    fullname:"",
    password:"",
    phonenumber:"",
    servicetype:"",
    serviceareas:"",
  });

  const handleInputChange =(e) =>{
    const {name,value} = e.target;
    setSprovider((prevSprovider) => ({...prevSprovider,[name]:value}));
  };
  const handleSubmit =(e) => {
    e.preventDefault();

    sendRequest().then((res)=> {
      
        const responseData = res; // Assuming response data is directly available as res.data
        console.log("Response from server:", responseData);
        if (responseData.status === "ok") {
          alert("Register Success");
          history("/splog");
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
    const res = await axios.post("http://localhost:5000/sproviders",{
    username:String(sprovider.username),
    gmail:String(sprovider.gmail),
    fullname:String(sprovider.fullname),
    password:String(sprovider.password),
    phonenumber:String(sprovider.phonenumber),
    servicetype:String(sprovider.servicetype),
    serviceareas:String(sprovider.serviceareas),
  });
    return res.data;  // If registration is successful 
}catch (error) {
  throw new Error("Failed to register user"); // If registration fails
}

 };

  return (
    <div>
        <Navbar/>
        <h1>Service Provider Register</h1>
        <form onSubmit={handleSubmit}>
          <label>UserName</label>
          <br />
          <input type="text" value={sprovider.username} onChange={handleInputChange} name="username" required /><br /><br />
          <label>Gmail</label>
          <br />
          <input type="email" value={sprovider.gmail} onChange={handleInputChange} name="gmail" required /><br /><br />
          <label>FullName</label>
          <br />
          <input type="text" value={sprovider.fullname} onChange={handleInputChange} name="fullname" required /><br /><br />
          <label>Password</label>
          <br />
          <input type="password" value={sprovider.password} onChange={handleInputChange} name="password" required /><br /><br />
          <label>Phone Number</label>
          <br />
          <input type="text" value={sprovider.phonenumber} onChange={handleInputChange} name="phonenumber" required /><br /><br />
          <label>Service Type</label>
          <br />
          <input type="text" value={sprovider.servicetype} onChange={handleInputChange} name="servicetype" required /><br /><br />
          <label>Service Areas</label>
          <br />
          <input type="text" value={sprovider.serviceareas} onChange={handleInputChange} name="serviceareas" required /><br /><br />
          <button>Register</button>
        </form>
        
     <Footer/>
    </div>
  )
}

export default Sregister
