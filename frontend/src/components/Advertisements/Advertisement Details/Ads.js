import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
// import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom';
import '../Advertisement Details/Ads.css';
// import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Navbar from '../../customerScreens/navbar';

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ads');
        setAds(response.data.ads);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  //const history = useNavigate();

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/ads/${id}`);
      // Remove the deleted ad from the local state
      setAds(prevAds => prevAds.filter(ad => ad._id !== id));
      alert("Advertisement successfully deleted!");
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

  const handleSearch = () => {
    const filteredAds = ads.filter((ad) =>
      Object.values(ad).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setAds(filteredAds);
    setNoResults(filteredAds.length === 0);
  };

  return (
    <div>
      <Navbar/>
      <h1>Advertisements </h1>
      <Link to={"/AddAd"} className="insert-button">Add Advertisement</Link>
      <div className="search-bar">
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Ad Details"
      />
      <button onClick={handleSearch}>Search</button>
      </div>
      {noResults ? (
        <div>
          <p>No Ads Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef}>
          {ads.map((ad, index) => (
            <div key={index} className="ad-container">
              
              {/* Output ad details */}
              <h2 className="ad-title">{ad.adTitle}</h2>
              <h4 className="Ad-Description"> {ad.adDescription}</h4>
              <p>
                <strong>ID:</strong> {ad._id}
              </p>
              <p>
                <strong>Service Type:</strong> {ad.serviceType}
              </p>
              <p>
                <strong>Required Date:</strong> {ad.reqDate}
              </p>
              <p>
                <strong>No of Days:</strong> {ad.noOfDays}
              </p>
              <p>
                <strong>Area:</strong> {ad.area}
              </p>
              <p>
                <strong>Contact No:</strong> {ad.contactNumber}
              </p>
              <p>
                <strong>Email:</strong> {ad.email}
              </p>
              <p>
                <strong>Date:</strong> {ad.date}
              </p>
              <div className="button-container">
              <Link to={`/advertisementdetails/${ad._id}`} className="update-button">Update</Link>
              <button onClick={() => deleteHandler(ad._id)} className="delete-button">Delete</button>
            </div></div>
          ))}
        </div>
      )}
      <div>
        <button onClick={handlePrint} className="download-button">Download Ad Report</button>
      </div>
    </div>
  );
};

export default Ads;
