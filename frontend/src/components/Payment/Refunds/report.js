import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from "../../navbar/navbar";
import './Refund.css';

function Refund() {
  const [refunds, setRefunds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const ComponentsRef = useRef();

  useEffect(() => {
    const fetchAndFilterRefunds = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/refund');
        console.log('Response:', response);
        if (response && response.data) {
          console.log('Response Data:', response.data);
          let filteredRefunds = response.data;
          if (filteredRefunds.length === 0) {
            setNoResults(true);
          } else {
            setNoResults(false);
          }
          setRefunds(filteredRefunds);
        } else {
          throw new Error('Invalid data format received from server');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchAndFilterRefunds();
  }, []);
  
  useEffect(() => {
    console.log('Refunds:', refunds);
  }, [refunds]);

  return (
    <div>
      <Navbar />
      <div>
        <h1 className='h1mvl'>Teacher Salary Report</h1>
        <h1 className='Payment h1'>Refund Details</h1>

        {isLoading && <p>Loading...</p>}

        {error && <p>Error: {error}</p>}

        {refunds.length > 0 ? (
          <div ref={ComponentsRef}>
            <table className='payment-table'>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email Address</th>
                  <th>Postal Address (City)</th>
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
          <p>{noResults ? 'No results found.' : 'Loading...'}</p> // Display loading if not yet fetched
        )}
      </div>
    </div>
  );
}

function RefundDetails({ refund }) {
  const { _id, fname, gmail, address, Phone, ServiceType, amount, date, reason, PaymentSlip, Status } = refund;

  // Format the date to a more readable format
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <tr>
      <td>{fname}</td>
      <td>{gmail}</td>
      <td>{address}</td>
      <td>{Phone}</td>
      <td>{ServiceType}</td>
      <td>{amount}</td>
      <td>{formattedDate}</td>
      <td>{reason}</td>
      <td>{PaymentSlip}</td>
      <td>{Status}</td>
    </tr>
  );
}

export default Refund;
