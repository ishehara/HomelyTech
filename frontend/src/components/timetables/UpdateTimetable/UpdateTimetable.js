import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../../navbar/navbar"; // Adjusted import path
import "./updatetimetable.css";


function UpdateTimetable() {
  const [inputs, setInputs] = useState({
    name: "",
    technicianId: "",
    phoneNo: "",
    date: "",
    time: "",
    address: "",
  });

  const history = useNavigate();
  const technicianId = useParams().technicianId;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/timetables/${technicianId}`
        );
        setInputs(response.data.timetables); // Assuming timetable data is under timetables key
      } catch (error) {
        console.error("Error fetching timetable:", error);
      }
    };
    fetchHandler();
  }, [technicianId]);

  const sendRequest = async () => {
    try {
      await axios.put(
        `http://localhost:5000/timetables/${technicianId}`,
        inputs
      );
      alert("Details updated successfully!")
      history("/timetabledetails");
    } catch (error) {
      console.error("Error updating timetable:", error);
      alert("Failed to update details, Please try again");
      return false;
    }
  };

  const handleChange = (e) => {    
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <div>
      <Navbar/>
    <div className="u1">
      <h1>Update Timetable</h1>
      <form className="form-updatetimetable" onSubmit={handleSubmit}>
        {inputs && (
          <>
            <label className="label-updateTime">Name : </label>
            <br />
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              className="updateTime-field"
              required
            ></input>
            <br />
            <label className="label-updateTime">Technician ID : </label>
            <br />
            <input
              type="text"
              name="technicianId"
              onChange={handleChange}
              value={inputs.technicianId}
              className="updateTime-field"
              required
            ></input>
            <br />
            <label className="label-updateTime">Phone Number : </label>
            <br />
            <input
              type="tel"
              name="phoneNo"
              onChange={handleChange}
              value={inputs.phoneNo}
              className="updateTime-field"
              required
            ></input>
            <br />
            <label className="label-updateTime">Date : </label>
            <br />
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={inputs.date}
              className="updateTime-field"
              min={new Date().toISOString().split('T')[0]} // Set min attribute to today's date
              required
            ></input>
            <br />
            <label className="label-updateTime">Time : </label>
            <br />
            <input
              type="time"
              name="time"
              onChange={handleChange}
              value={inputs.time}
              className="updateTime-field"
              required
            ></input>
            <br />
            <label className="label-updateTime">Address : </label>
            <br />
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={inputs.address}
              className="updateTime-field"
              required
            ></input>
            <br />
            {/* Add other input fields similarly */}
          </>
        )}
        <br />
        <div className="btn-updateTime-container">
        <button className="btn-updateTime">Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default UpdateTimetable;
