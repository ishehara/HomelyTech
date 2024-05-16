import React, { useState } from "react";
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddFeedback.css";
import Footer from "../../customerScreens/Footer/footer";
import Navbar from "../../customerScreens/navbar";
import Bgvideo from '../../../media/videoBg.mp4'; // Import the background video file

function AddFeedback() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ feedback: "", rating: 0, image: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const baseurl = 'http://localhost:5000';

  const prohibitedWords = [
    'bad',
    'inappropriate',
    'offensive',
    'hate',
    'violence',
    'discrimination',
    'racist',
    'sexist',
    'harassment',
    'abuse',
    'threat',
    'vulgar',
    'obscene',
    'profanity',
    'porn',
    'pornography',
    'illegal',
    'fraud',
    'scam',
    'spam',
    'sex',
    'xxx',
    
    // Add more prohibited words as needed
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure rating is handled as a number
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
        (snapshot) => {
          // Progress updates or other handling can be added here
        },
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
    console.log('Submitting feedback:', inputs);

    // Check if the feedback contains any prohibited words
    const containsProhibitedWord = prohibitedWords.some(word =>
      inputs.feedback.toLowerCase().includes(word)
    );

    if (containsProhibitedWord) {
      alert('Your feedback contains prohibited words. Please revise it.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseurl}/feedbacks`, inputs);
      console.log('Feedback added:', response.data);
      alert('Feedback added successfully!');
      navigate('/feedbackdetails');
      setIsLoading(false);
      setInputs({ feedback: "", rating: 0, image: "" }); // Reset inputs
    } catch (error) {
      console.error("Error adding feedback: ", error);
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
              checked={star === value}  // Ensure checked comparison is strict
              onChange={onChange}
            />
            <span className={star <= value ? "star selected" : "star"}>★</span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="video-container">
      {/* Video background and overlay */}
      <video src={Bgvideo} autoPlay muted loop className="video-bg"></video>
      <div className="bg-overlay"></div>
      <Navbar />
      <div className="form-container">
        <h1>Add Feedback</h1>
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
          <label>Image : </label>
          <input
            id="imageUpload"
            type="file"
            onChange={handleImageUpload}
            disabled={uploading}
          />
          {uploading && <p>Uploading Image...</p>}
          {inputs.image && <p>Image Uploaded Successfully!</p>}
          <br/>
          <br/>
          <label>Rating</label>
          <StarRating value={inputs.rating} onChange={handleChange} />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AddFeedback;
