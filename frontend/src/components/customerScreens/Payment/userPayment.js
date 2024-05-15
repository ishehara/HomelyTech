import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Payment.css';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Navbar from "../../navbar/navbar"; // Adjusted import path

function Payment() {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/payments');
        if (response && response.data && response.data.Payments) {
          setPayments(response.data.Payments);
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
  }, []);

  useEffect(() => {
    console.log('Payments:', payments);
  }, [payments]);

  const ComponentsRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Payment Report",
    onAfterPrint: () => alert("Payment Report Successfully Downloaded!"),
  });

  //search

  const handleSearch = () => {
    const filteredPayments = payments.filter((payment) =>
      Object.values(payment).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setPayments(filteredPayments);
    setNoResults(filteredPayments.length === 0);
  };

  const handleFetchPayments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/payments');
      if (response && response.data && response.data.Payments) {
        setPayments(response.data.Payments);
      } else {
        throw new Error('Invalid data format received from server');
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (paymentId) => {
    await axios.delete(`http://localhost:5000/payments/${paymentId}`);
    handleFetchPayments(); // Fetch updated data after deletion
  };

  return (
    <div>
      <Navbar/>
      <h1 className='Payment h1'>Payment Details</h1>
      {isLoading && <p>Loading payments...</p>}
      {error && <p>Error fetching payments: {error.message}</p>}
      <input
        className='Payment-input'
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder='Search Payment Details'
      />
      <button className='Payment-button' onClick={handleSearch}>Search</button>
      <br />
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

                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <PaymentRow
                  key={payment._id}
                  payment={payment}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No payments to display.</p>
      )}
      <br></br>
      <button className='Payment-button' onClick={handlePrint}>Download Report</button>
      <br></br>
    </div>
  );
}

function PaymentRow({ payment, handleDelete }) {
  const { _id, fname, gmail, address, Phone, ServiceType, amount,promo, PaymentSlip,Status } = payment;

  const deleteHandler = async () => {
    await handleDelete(_id); // Call handleDelete with paymentId
  };

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
        <button className='Payment-button'><Link to={`/paymentdetails/${_id}`} className='Payment-link'>Update</Link></button></td>
        <td>
        <button className='Payment-button' onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default Payment;
