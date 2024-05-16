import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './User.css';
//import Navbar from '../../customerScreens/navbar';
//import Footer from '../../customerScreens/Footer/footer';

function User(props) {
  const {_id,username,gmail,password,fullname,address,userLevel} = props.user;

  const history = useNavigate();

  const deleteHandler = async()=>{
    await axios.delete(`http://localhost:5000/users/${_id}`)
    .then(res=>res.data)
    .then(() =>history("/"))
    .then(() =>history("/userdetails"));
  }

  

  return (
    <div className="user-display">
      
      { <h1>User Display</h1> }
      <div className="user-table">
        <div className="user-row header-row">
          <div>ID</div>
          <div>Username</div>
          <div>Email</div>
          <div>Password</div>
          <div>Full Name</div>
          <div>Address</div>
          <div>User Level</div>
          <div>Operations</div>
        </div>
        <div className="user-row">
          <div>{_id}</div>
          <div>{username}</div>
          <div>{gmail}</div>
          <div>{password}</div>
          <div>{fullname}</div>
          <div>{address}</div>
          <div>{userLevel}</div>
          <div className="operations">
            <Link to={`/userdetails/${_id}`} className="user-button update-button">Update</Link>

            <button onClick={deleteHandler} className="user-button delete-button">Delete</button>
            
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default User;
