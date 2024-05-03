import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import navbar from '../../navbar/navbar';

function AddUser() {    //Insert input data

  const history = useNavigate();
  const [inputs,setInputs] = useState({
    username:"",
    gmail:"",
    password:"",
    fullname:"",
    address:"",
  });

  const handleChange =(e) =>{
    const {name,value} = e.target;
    setInputs((prevState) => ({...prevState,[name]:value}));
  };
  const handleSubmit =(e) => {
    e.preventDefault();

    sendRequest().then((res)=> {
      
        const responseData = res; // Assuming response data is directly available as res.data
        console.log("Response from server:", responseData);
        if (responseData.status === "ok") {
          alert("Register Success");
          history("/userdetails");
        } else if (responseData.status === "error") {
          alert("Failed to register user: " + responseData.message);
        } else {
          alert("Unknown status received from server");
        }
      
  }).catch((err) => {
    alert(err.message);
  });
 };

    const sendRequest = async()=>{
      try{
        const res = await axios
        .post("http://localhost:5000/users",{
          username:String(inputs.username),
          gmail:String(inputs.gmail),
          password:String(inputs.password),
          fullname:String(inputs.fullname),
          address:String(inputs.address),
        });
        return res.data; // If registration is successful
      } catch (error) {
        throw new Error("Failed to register user"); // If registration fails
      }
     };
    
     const isAdmin = sessionStorage.getItem('isAdmin');

     if (isAdmin === 'true') {

     return (
    <div>
        <navbar/>
      <h1>Add User</h1>
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
        <button>Submit</button>
      </form>
    </div>
  );
} else {
  // Render different content for non-admin users
  return (
      <div>
      <navbar/>
      <h1 className="users-title">Access Denied</h1>
      <p>Sorry, you don't have permission to view this page.</p>
    </div>
  );
}
}

export default AddUser