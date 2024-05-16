import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Navbar from "../../navbar/navbar";
import './Refund.css'

function Refund() {
  const [refunds, setRefunds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchRefunds();
  }, []);

  useEffect(() => {
    console.log('Refunds:', refunds);
  }, [refunds]);

  const ComponentsRef = useRef();

 


  const fetchRefunds = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/refund');
      if (response && response.data && response.data.refunds) {
        setRefunds(response.data.refunds);
      } else {
        throw new Error('Invalid data format received from server');
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

 

  return (
    <div>
      <Navbar/>
      <div>
        <h1 className='Payment h1'>Refund Details</h1>
       
        {refunds.length > 0 ? (
          <div ref={ComponentsRef}>
            <table className='payment-table'>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email Address</th>
                  <th>Postal Address(City)</th>
                  <th>Mobile Phone Number</th>
                  <th>Service Type</th>
                  <th>Amount Refunded</th>
                  <th>Refund Date</th>
                  <th>Reason for Refund</th>
                  <th>Payment Slip Reference Number</th>
                  <th>Status</th>
                  
                </tr>
              </thead>
              <tbody>
                {refunds.map(refund => (
                  <RefundDetails
                    key={refund._id}
                    refund={refund}
                  
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>{noResults ? 'No results found.' : 'No Refunds to display.'}</p>
        )}
      </div>
      
    </div>
  );
}

function RefundDetails({ refund, handleDelete }) {
  const { _id, fname, gmail, address, Phone, ServiceType, amount, date, reason, PaymentSlip, Status } = refund;

  const deleteHandler = async () => {
    await handleDelete(_id);
  };

  return (
    <tr>
      <td>{fname}</td>
      <td>{gmail}</td>
      <td>{address}</td>
      <td>{Phone}</td>
      <td>{ServiceType}</td>
      <td>{amount}</td>
      <td>{date}</td>
      <td>{reason}</td>
      <td>{PaymentSlip}</td>
      <td>{Status}</td>
      
    </tr>
  );
}

export default Refund;
