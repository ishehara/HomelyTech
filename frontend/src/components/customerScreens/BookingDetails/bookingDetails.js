import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import Booking from '../Booking/Booking';
import { useReactToPrint } from 'react-to-print';
import Nav from "../../navbar/navbar";

const URL = "http://Localhost:5000/bookings";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function BookingDetails() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetchHandler().then((data) => setBookings(data.bookings));
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Booking Report",
    onAfterPrint: () => alert("Booking Report Successfully Downloaded!"),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredBookings = data.bookings.filter((booking) =>
        Object.values(booking).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setBookings(filteredBookings);
      setNoResults(filteredBookings.length === 0);
    });
  };

  return (
    <div>
      <Nav/>
    <div style={{ padding: '20px' }}>

      <h1>Booking Details</h1>
      <input
        style={{
          padding: '10px',
          marginBottom: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '2px solid #ccc',
          width: '300px'
        }}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Booking Details"
      />

      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={handleSearch}>Search</button>

      {noResults ? (
        <div style={{ marginTop: '20px' }}>
          <p>No Bookings Found</p>
        </div>
      ) : (
        <div ref={componentRef} style={{ marginTop: '20px' }}>
          {bookings.map((booking, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <Booking booking={booking} />
            </div>
          ))}
        </div>
      )}
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={handlePrint}>Download Report</button>


    </div>
    </div>
  )
}

export default BookingDetails;
