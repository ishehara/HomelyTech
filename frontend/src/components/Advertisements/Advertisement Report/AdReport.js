import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../../navbar/navbar';
import './AdReport.css'; // Import CSS file for styling
import { useReactToPrint } from 'react-to-print';

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [numberOfAds, setNumberOfAds] = useState(0); // Initialize numberOfAds state
  
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ads');
        let adsData = response.data.ads;
        
        // Retrieve likes from local storage and update ads array
        const storedLikes = JSON.parse(localStorage.getItem('likes')) || {};
        adsData = adsData.map(ad => ({
          ...ad,
          likes: storedLikes[ad._id] || 0 // Use stored like count or default to 0
        }));
        
        // Sort ads by likes in descending order
        adsData.sort((a, b) => b.likes - a.likes);
        
        setAds(adsData);
        setNumberOfAds(adsData.length); // Update numberOfAds
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
    
    fetchAds();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/ads/${id}`);
      // Remove the deleted ad from the local state
      setAds(prevAds => prevAds.filter(ad => ad._id !== id));

      // Remove like count from local storage
      const storedLikes = JSON.parse(localStorage.getItem('likes')) || {};
      delete storedLikes[id];
      localStorage.setItem('likes', JSON.stringify(storedLikes));

      alert("Advertisement successfully deleted!");
      
      // Update numberOfAds after deletion
      setNumberOfAds(prevNumber => prevNumber - 1);
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Ad Report",
    onAfterPrint: () => alert("Ad Report Successfully Downloaded!"),
  });

  return (
    <div>
      <Navbar />
      <h1>Advertisements</h1>
      <h4><b>Total Advertisements: {numberOfAds}</b></h4> {/* Display total number of ads */}
      <table ref={ComponentsRef} className="ads-table"> 
        <thead>
          <tr>
            <th>Ad Title</th>
            <th>Ad Description</th>
            <th>Service Type</th>
            <th>Required Date</th>
            <th>No of Days</th>
            <th>Area</th>
            <th>Contact No</th>
            <th>Email</th>
            <th>Date</th>
            <th>Likes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad, index) => (
            <tr key={index}>
              <td>{ad.adTitle}</td>
              <td>{ad.adDescription}</td>
              <td>{ad.serviceType}</td>
              <td>{ad.reqDate}</td>
              <td>{ad.noOfDays}</td>
              <td>{ad.area}</td>
              <td>{ad.contactNumber}</td>
              <td>{ad.email}</td>
              <td>{ad.date}</td>
              <td>{ad.likes || 0}</td>
              <td>
                <button onClick={() => handleDelete(ad._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrint} className="display-details-Btn">Download Ad Report</button>
    </div>
  );
};

export default Ads;
