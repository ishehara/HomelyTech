import React, { useEffect, useRef, useState, forwardRef } from "react";
import axios from "axios";
import Feedback from "../Feedback/Feedback";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import Navbar from "../../customerScreens/navbar";
import Footer from "../../customerScreens/Footer/footer";

const URL = "http://localhost:5000/feedbacks"


const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetched feedbacks:", response.data.feedbacks);
    return response.data.feedbacks;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return [];
  }
};

const PrintableFeedbacks = forwardRef(({ feedbacks, onDelete }, ref) => (
  <div ref={ref}>
    {feedbacks.map((feedback) => (
      <Feedback
        key={feedback._id}
        {...feedback}
        onDelete={() => onDelete(feedback._id)}
      />
    ))}
  </div>
));

function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State variable for success message
  const ComponentsRef = useRef();

  useEffect(() => {
    fetchHandler()
    .then((data) => {
      setFeedbacks(data || []);
      calculateAverageRating(data || []);
    });
  }, []);

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "User_Report",
    onAfterPrint: () => alert("User Report Successfully Downloaded!"),
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // If search query is empty, fetch all feedbacks
      fetchHandler().then((data) => {
        setFeedbacks(data);
        calculateAverageRating(data);
        setNoResults(false);
      });
      return;
    }

    try {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(searchQuery.trim());
      let response;

      if (isObjectId) {
        // If search query is a valid ObjectId, search by ID
        response = await axios.get(`${URL}/${searchQuery.trim()}`);
      } else {
        // Otherwise, search by other criteria
        response = await axios.get(
          `${URL}?search=${encodeURIComponent(searchQuery.trim())}`
        );
      }

      if (response.data) {
        const data = Array.isArray(response.data.feedbacks)
          ? response.data.feedbacks
          : [response.data.feedback];
        setFeedbacks(data);
        setNoResults(data.length === 0);
        calculateAverageRating(data);
      } else {
        setFeedbacks([]);
        setNoResults(true);
        setAverageRating(null);
      }
    } catch (error) {
      console.error("Error searching feedbacks:", error);
      setFeedbacks([]);
      setNoResults(true);
      setAverageRating(null);
    }
  };

  const calculateAverageRating = (feedbacks) => {
    if (!feedbacks.length) {
      setAverageRating(null);
      return;
    }
    const totalRating = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
    const avgRating = (totalRating / feedbacks.length).toFixed(2);
    setAverageRating(avgRating);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${URL}/${id}`);
      if (response.status === 200) {
        const updatedFeedbacks = feedbacks.filter(
          (feedback) => feedback._id !== id
        );
        setFeedbacks(updatedFeedbacks);
        calculateAverageRating(updatedFeedbacks);
        setShowSuccessMessage(true); // Show success message
        setTimeout(() => setShowSuccessMessage(false), 3000); // Hide success message after 3 seconds
      }
    } catch (error) {
      console.error("Failed to delete feedback:", error);
    }
  };

  return (
    <div style={{height:'100vh'}}>
    <Navbar />
      <div style={{ height: '50vh', padding: '20px', boxSizing: 'border-box' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>User Details Display Page</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          name="search"
          placeholder="Search Feedback Details"
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '300px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginRight: '10px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>
      <div style={{ textAlign: 'center', margin: '10px' }}>
        <Link to="/add-feedback">
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Add Feedback & Rating
          </button>
        </Link>
        {averageRating !== null && (
          <p style={{ display: 'inline-block', margin: '0 20px' }}>Average Rating: ⭐ {averageRating}</p>
        )}
        <button
          onClick={handlePrint}
          style={{
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Download Report
        </button>
      </div>
      {noResults ? (
        <p style={{ textAlign: 'center', color: 'red' }}>No Feedback Details Found</p>
      ) : (
        <div style={{ maxHeight: '500px', overflowY: 'scroll', marginBottom: '20px' }}>
          <PrintableFeedbacks
            feedbacks={feedbacks}
            onDelete={handleDelete}
            ref={ComponentsRef}
          />
        </div>
      )}
      {showSuccessMessage && (
        <p style={{ color: 'green', textAlign: 'center' }}>Feedback deleted successfully!</p>
      )}
    </div>
    </div>
  );
}

export default Feedbacks;
