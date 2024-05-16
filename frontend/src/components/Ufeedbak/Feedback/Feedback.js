import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Feedback.css';
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';

function Feedback({ _id, feedback, rating, onDelete, image }) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to manage success message

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/feedbacks/${_id}`);
      if (response.status === 200) {
        onDelete(_id);
        setShowSuccessMessage(true); // Set showSuccessMessage to true after successful deletion
        setTimeout(() => {
          window.location.reload(); // Reload the page after 1 second to display success message
        }, 1000);
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    
      <div className="feedback-container">
        <h3>Feedback and Q&A Display</h3>
        <div>ID: {_id}</div>
        <br></br>
        <div>Feedback: {feedback}</div>
        <br></br>
        <div>Rating: {rating}</div>
        <br></br>
        <img src={image} style={{ width: '100px', }}  />
        <br></br>
        <Link to={`/feedbackdetails/${_id}`} className="link-button">Update</Link>
        <button onClick={deleteHandler} className="delete-button">Delete</button>
        {showSuccessMessage && <p style={{ color: 'green' }}>Feedback deleted successfully!</p>} {/* Render success message if showSuccessMessage is true */}
      </div>
  );
}

export default Feedback;
