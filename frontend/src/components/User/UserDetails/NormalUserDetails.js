import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import User from '../User/User';
import { useReactToPrint } from "react-to-print";
import './users.css';
import Navbar from '../../customerScreens/navbar';

const URL = "http://localhost:5000/users";

const fetchUserDetails = async (userId) => {
  try {
    const response = await axios.get(`${URL}/${userId}`);
    console.log('Response data:', response.data); // Log the response data
    return response.data.users; // Access users key instead of user
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
}

function NormalUserDetails() {
  const [user, setUser] = useState(null); // State variable to store user details
  const userId = sessionStorage.getItem('userId'); // Get userId from sessionStorage

  useEffect(() => {
    const fetchUserData = async () => {
        try {
          const userData = await fetchUserDetails(userId);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user details:', error);
          setUser(null); // Reset user state to null in case of error
        }
      };
      fetchUserData();
  }, [userId]);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Users Report",
    onafterprint: () => alert("Users Report Successfully Download !"),
  });

  // // WhatsApp details send function
  // const handleSendReport = () => {
  //   const phoneNumber = "+94704494254";
  //   const message = `selected User Reports`;
  //   const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  //   window.open(WhatsAppUrl, "_blank");
  // }

  return (
    
    <div>
      <Navbar/>
      <h1 className="users-title">User Details Display Page</h1>
      {user ? (
        <div ref={ComponentsRef}>
          <User user={user} />
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
      
    </div>
  )
}

export default NormalUserDetails;