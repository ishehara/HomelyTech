import React, { useEffect, useRef, useState } from "react";
//import Nav from "../Nav/Nav";
import axios from "axios";
import Timetable from "../Timetable/Timetable";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import './timetables.css';
import Navbar from "../../navbar/navbar"; // Adjusted import path


const URL = "http://localhost:5000/timetables";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Timetables() {
  const [timetables, setTimetables] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setTimetables(data.timetables));
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Timetable Details Report",
    onafterprint: () => alert("Timetable Report Successfully Downloaded !"),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredTimetables = data.timetables.filter((timetable) =>
        Object.values(timetable).some((field) =>
          field.toString().includes(searchQuery)
        )
      );
      setTimetables(filteredTimetables);
      setNoResults(filteredTimetables.length === 0);
    });
  };

  // Function to calculate the number of unique technicians
  const calculateNumberOfTechnicians = () => {
    if (!timetables) return 0;
    const techniciansSet = new Set();
    timetables.forEach((timetable) => {
      techniciansSet.add(timetable.technicianId);
    });
    return techniciansSet.size;
  };

  return (
    <div>
      <Navbar/>
    <div className="timetables-container">
    
      <h1>Timetables Details Display Page</h1>
      <div className="search-container">      
      <input className="search-input"
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Enter Technician ID or Technician Name"
      ></input>

      <button className='search-btn'onClick={handleSearch}>Search</button></div>
      {noResults ? (
        <div>
          <p>No Timetable Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef}>
          {timetables &&
            timetables.map((timetable, i) => (
              <div key={i}>
                <Timetable timetable={timetable} />
              </div>
            ))}

          <div>
            <h2>Number of Technicians: {calculateNumberOfTechnicians()}</h2>
          </div>
        </div>
      )}
      <button className="report" onClick={handlePrint}>Download Report</button>
      <Link className="addtime" to={`/addtimetable/`}>
                Add Timetable
              </Link>
    </div>
    </div>
  );
}

export default Timetables;
