import React, { useState, useEffect } from "react";
import Navbar from "../navbar/navbar";

function Manager() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = () => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return currentDateTime.toLocaleDateString(undefined, options);
  };

  const formattedTime = () => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return currentDateTime.toLocaleTimeString(undefined, options);
  };

  return (
    <div>
      <Navbar />
      <div className="admin-dashboard">
        <div className="calendar">
          <h2>Calendar</h2>
          <p>{formattedDate()}</p>
        </div>
        <div className="clock">
          <h2>Time</h2>
          <p>{formattedTime()}</p>
        </div>
      </div>
    </div>
  );
}

export default Manager;
