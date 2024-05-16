import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import User from '../User/User';
import { useReactToPrint } from "react-to-print";
import { Link } from 'react-router-dom';
import './users.css';
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';

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

  // Function to check if user's Gmail matches payment Gmail
  const isCurrentUserPayment = (paymentGmail) => {
    return user && user.gmail === paymentGmail;
  };
  

  return (
    
    <div>
      <Navbar/>
      <h1 className="users-title">User Details Display Page</h1>
      {user ? (
        <div ref={ComponentsRef}>
          <User user={user} />
          <Payment currentUserGmail={user.gmail} />
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
      <Footer/>
    </div>
  )
}


// get the Payment Details for the user

function Payment({ currentUserGmail }) {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/payments');
        if (response && response.data && response.data.Payments) {
          // Filter payments where payment gmail matches current user's gmail
          const filteredPayments = response.data.Payments.filter(payment => payment.gmail === currentUserGmail);
          setPayments(filteredPayments);
        } else {
          throw new Error('Invalid data format received from server');
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [currentUserGmail]);

  const ComponentsRef = useRef();

  
  
  return (
    <div>
      <h1 className='Payment h1'>Payment Details</h1>
      {isLoading && <p>Loading payments...</p>}
      {error && <p>Error fetching payments: {error.message}</p>}
      {payments.length > 0 ? (
        <div ref={ComponentsRef}>
          <table className='payment-table'>
            <thead>
              <tr>
                <th>Identity Number</th>
                <th>User Name</th>
                <th>Email Address</th>
                <th>Postal Address(City)</th>
                <th>Mobile Phone Number</th>
                <th>Service Type</th>
                <th>Amount Paid</th>
                <th>Promo Code</th>
                <th>Payment Slip Reference Number</th>
                <th>Status</th>
                <th>Refund Request</th>
               
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <PaymentRow
                  key={payment._id}
                  payment={payment}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No payments to display.</p>
      )}
      <br></br>
      {/* <button className='Payment-button' onClick={handlePrint}>Download Report</button> */}
      <br></br>
    </div>
  );
}

// Payment 

function PaymentRow({ payment }) {
  const { _id, fname, gmail, address, Phone, ServiceType, amount, promo, PaymentSlip, Status } = payment;

  return (
    <tr>
      <td>{_id}</td>
      <td>{fname}</td>
      <td>{gmail}</td>
      <td>{address}</td>
      <td>{Phone}</td>
      <td>{ServiceType}</td>
      <td>{amount}</td>
      <td>{promo}</td>
      <td>{PaymentSlip}</td>
      <td>{Status}</td>
      <td>
        {/* Conditionally render the "Request Refund" button */}
        {Status === "Pending" ? (
          <button className='Payment-button'>
            <Link to="/refundPayment" className='Payment-link'>Refund Request</Link>
          </button>
        ) : (
          <button className='Payment-button' disabled>
            Refund Request
          </button>
        )}
      </td>
      <td>
        
        {/* Conditionally render the "Delete" button */}
        {/* {Status === "Pending" ? (
          <button className='Payment-button'  onClick={handleDelete}>
            Delete
          </button>
        ) : (
          <button className='Payment-button' disabled>
            Delete
          </button>
        )} */}
      </td>
    </tr>
  );
}

export default NormalUserDetails;
