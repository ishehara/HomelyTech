import React, { useState, useEffect, useRef } from 'react';
import './Payment.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';


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
    onAfterPrint: () => alert("Users Report Successfully Downloaded!"),
  });

  const handleSearch = () => {
    const filteredPayments = payments.filter((payment) =>
      Object.values(payment).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setPayments(filteredPayments);
    setNoResults(filteredPayments.length === 0);
  };

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

  const handleDelete = async (paymentId) => {
    await axios.delete(`http://localhost:5000/payments/${paymentId}`);
    fetchPayments(); // Fetch updated data after deletion
  };

  return (
    <div>
      <h1 className='Payment h1'>Payment Details</h1>
      {isLoading && <p>Loading payments...</p>}
      {error && <p>Error fetching payments: {error.message}</p>}
      <input className='Payment input[type="text"]'
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder='Search Payment Details'
      />
      <button className='Payment button' onClick={handleSearch}>Search</button>
      <br />
      {payments.length > 0 ? (
        payments.map(payment => (
          <PaymentDetails
            key={payment._id}
            payment={payment}
            ComponentsRef={ComponentsRef}
            handlePrint={handlePrint}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            handleDelete={handleDelete} // Pass handleDelete function
            noResults={noResults}
          />
        ))
      ) : (
        <p>No payments to display.</p>
      )}
    </div>
  );
}

function PaymentDetails({ payment, ComponentsRef, handlePrint, setSearchQuery, handleSearch, handleDelete, noResults }) {
  const { _id, fname, gmail, address, Phone, ServiceType, amount, PaymentSlip } = payment;

 //const history = useNavigate();

  const deleteHandler = async () => {
    await handleDelete(_id); // Call handleDelete with paymentId
  };

  return (
    <div>
      <h2>Display Payment</h2>
      {noResults ? (
        <div>
          <p>No Payments Found</p>
        </div>
      ) : (
        <div className='ComponentsRef' ref={ComponentsRef}>
          <p className='ComponentsRef p'><strong className='ComponentsRef strong'> Identity Number :</strong> {_id} (Automatically Generated. Only for office use) </p>
          <p className='ComponentsRef p'><strong className='ComponentsRef strong' >User Name : </strong> {fname}</p>
          <p className='ComponentsRef p'><strong className='ComponentsRef strong'>Email Address : </strong> {gmail}</p>
          <p className='ComponentsRef p'><strong className='ComponentsRef strong'>Postal Address(City) : </strong> {address}</p>
          <p className='ComponentsRef p'><strong className='ComponentsRef strong'>Mobile Phone Number : </strong> {Phone}</p>
          <p className='ComponentsRef p'><strong className='ComponentsRef strong'>ServiceType you hired :</strong> {ServiceType}</p>
          <p className='ComponentsRef p'><strong className='ComponentsRef strong'>Amount you Paid :</strong> {amount}</p>
          <p className='ComponentsRef p'><strong className='ComponentsRef strong'>Payment Slip Referance Number :</strong> {PaymentSlip}</p>
        </div>
      )}
      <button className='Payment button'><Link to={`/paymentdetails/${_id}`}>Update</Link></button>
      <button className='Payment button' onClick={deleteHandler}>Delete</button>
      <button className='Payment button' onClick={handlePrint}>Download Report</button>
    </div>
  );
}

export default Payment;
