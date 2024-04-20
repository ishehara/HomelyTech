import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Navbar from "../../navbar/navbar"; // Adjusted import path


function Refund() {
  const [refunds, setRefunds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
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
  
    fetchRefunds();
  }, []);

  useEffect(() => {
    console.log('Refunds:', refunds);
  }, [refunds]);

  const ComponentsRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Refund Report",
    onAfterPrint: () => alert("Refund Report Successfully Downloaded!"),
  });

  const handleSearch = () => {
    const filteredRefunds = refunds.filter((refund) =>
      Object.values(refund).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setRefunds(filteredRefunds);
    setNoResults(filteredRefunds.length === 0);
  };

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

  const handleDelete = async (refundId) => {
    await axios.delete(`http://localhost:5000/refund/${refundId}`);
    fetchRefunds(); // Fetch updated data after deletion
  };

  return (
    <div>
      <Navbar/>
    <div>
      <h1 className='Payment h1'>Refund Details</h1>
      {isLoading && <p>Loading refunds...</p>}
      {error && <p>Error fetching refunds: {error.message}</p>}
      <input
        className='Payment input[type="text"]'
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder='Search Refund Details'
      />
      <button className='Payment button' onClick={handleSearch}>Search</button>
      <br />
      {refunds.length > 0 ? (
        refunds.map(refund => (
          <RefundDetails
            key={refund._id}
            refund={refund}
            ComponentsRef={ComponentsRef}
            handlePrint={handlePrint}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            handleDelete={handleDelete} // Pass handleDelete function
            noResults={noResults}
          />
        ))
      ) : (
        <p>No Refunds to display.</p>
      )}
    </div>
    </div>
  );
}

function RefundDetails({ refund, ComponentsRef, handlePrint, setSearchQuery, handleSearch, handleDelete, noResults }) {
  const { _id, fname, gmail, address, Phone, ServiceType, amount, date, reason, PaymentSlip } = refund;

  //const history = useNavigate();

  const deleteHandler = async () => {
    await handleDelete(_id); // Call handleDelete with refundId
  };

  return (
    <div>
      <h2>Display Refund</h2>
      {noResults ? (
        <div>
          <p>No Refunds Found</p>
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
          <p className='ComponentsRef p'><strong className='ComponentsRef strong'>Date :</strong> {date}</p>
          <p className='ComponentsRef p'><strong className='ComponentsRef strong'>Reason for refund :</strong> {reason}</p>
          <p className='ComponentsRef p'><strong className='ComponentsRef strong'>Payment Slip Referance Number :</strong> {PaymentSlip}</p>
        </div>
      )}
      <button className='Payment button'><Link to={`/refunddetails/${_id}`}>Update</Link></button>
      <button className='Payment button' onClick={deleteHandler}>Delete</button>
      <button className='Payment button' onClick={handlePrint}>Download Report</button>
    </div>
  );
}

export default Refund;
