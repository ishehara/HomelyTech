import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AverageRating.css'; // Import the CSS file

function AverageRating() {
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    fetchFeedbackDetails();
  }, []);

  const fetchFeedbackDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/feedbacks');
      const feedbackDetails = response.data;
      const totalRating = feedbackDetails.reduce((acc, curr) => acc + curr.rating, 0);
      const avgRating = totalRating / feedbackDetails.length;
      setAverageRating(avgRating.toFixed(2)); // Round to 2 decimal places
    } catch (error) {
      console.error('Error fetching feedback details:', error);
    }
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star" style={{ color: 'yellow' }}>&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star">&#9734;</span>);
      }
    }
    return stars;
  };

  return (
    <div>
      <h1>Average Rating</h1>
      <p>
        {averageRating !== null ? (
          <>
            {`Average Rating: `}
            {renderStars(parseFloat(averageRating))}
          </>
        ) : (
          'Loading...'
        )}
      </p>
    </div>
  );
}

export default AverageRating;
