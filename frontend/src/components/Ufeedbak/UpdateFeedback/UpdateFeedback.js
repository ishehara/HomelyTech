import React, { useState, useEffect } from "react";
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./UpdateFeedback.css";
import Navbar from "../../customerScreens/navbar";
import Footer from "../../customerScreens/Footer/footer";

function UpdateFeedback() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputs, setInputs] = useState({ feedback: "", rating: 0, image: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const baseurl = 'http://localhost:5000';

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`${baseurl}/feedbacks/${id}`);
        const fetchedData = response.data.feedback || {};
        setInputs(fetchedData);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'rating' ? parseInt(value, 10) : value;
    setInputs({ ...inputs, [name]: newValue });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileRef = ref(storage, `images/${file.name}`);
    setUploading(true);

    try {
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.error("Upload failed:", error);
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setInputs(prevInputs => ({ ...prevInputs, image: downloadURL }));
            setUploading(false);
          });
        }
      );
    } catch (error) {
      console.error("Error uploading file: ", error);
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(`${baseurl}/feedbacks/${id}`, inputs);
      console.log('Feedback updated:', response.data);
      alert('Feedback updated successfully!');
      navigate('/feedbackdetails');
      setIsLoading(false);
      setInputs({ feedback: "", rating: 0, image: "" });
    } catch (error) {
      console.error("Error updating feedback: ", error.response.data);
      setIsLoading(false);
    }
  };

  const StarRating = ({ value, onChange }) => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <div>
        {stars.map((star) => (
          <label key={star}>
            <input
              type="radio"
              name="rating"
              value={star}
              checked={star === value}
              onChange={onChange}
            />
            <span className={star <= value ? "star selected" : "star"}>★</span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h1>Update Feedback</h1>
        <form onSubmit={handleSubmit}>
          <label>Feedback</label>
          <input
            type="text"
            name="feedback"
            onChange={handleChange}
            value={inputs.feedback}
            required
          />
          <br/><br/>
          <label>Image: </label>
          {inputs.image && (
            <img src={inputs.image} alt="Feedback" style={{ width: '100px', height: '100px' }} />
          )}
          <input
            id="imageUpload"
            type="file"
            onChange={handleImageUpload}
            disabled={uploading}
          />
          {uploading && <p>Uploading Image...</p>}
          {inputs.image && <p>Image Uploaded Successfully!</p>}
          <br/><br/>
          <label>Rating</label>
          <StarRating value={inputs.rating} onChange={handleChange} />
          <button type="submit" disabled={isLoading} >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default UpdateFeedback;
