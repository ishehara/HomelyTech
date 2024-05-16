import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./addTimetable.css";
import Navbar from "../../navbar/navbar"; // Adjusted import path

function AddTimetable() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    technicianId: "",
    phoneNo: "",
    date: "",
    time: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for phone number: Allow only 10 digits
    if (name === "phoneNo" && !/^\d{0,10}$/.test(value)) {
      // If the entered value is not exactly 10 digits or empty, don't update state
      return;
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    try {
      await sendRequest();
      navigate("/timetabledetails");
      alert("Details added successfully");
    } catch (error) {
      console.error("Error!:", error);
    }
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/timetables", {
        name: String(inputs.name),
        technicianId: String(inputs.technicianId),
        phoneNo: Number(inputs.phoneNo),
        date: Date(inputs.date),
        time: String(inputs.time),
        address: String(inputs.address),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <Navbar />
      <div className="b1">
        <h1>
          <center>Add Timetable</center>
        </h1>
        <form className="form-addtimetable" onSubmit={handleSubmit}>
        <label className="label-addTime">Name : </label>
        <br />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={inputs.name}
          className="addTime-field"
          required
        ></input>
        <br></br>
        <br></br>
        <label className="label-addTime">Technician ID : </label>
        <br />
        <input
          type="text"
          name="technicianId"
          onChange={handleChange}
          value={inputs.technicianId}
          className="addTime-field"
          required
        ></input>
        <br></br>
        <br></br>
        <label className="label-addTime">Phone Number : </label>
        <br />
        <input
          type="tel"
          name="phoneNo"
          onChange={handleChange}
          value={inputs.phoneNo}
          className="addTime-field"
          required
        ></input>
        <br></br>
        <br></br>
        <label className="label-addTime">Date : </label>
        <br />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]} // Set min attribute to today's date
          value={inputs.date}
          className="addTime-field"
          required
        ></input>
        <br></br>
        <br></br>
        <label className="label-addTime">Time : </label>
        <br />
        <input
          type="time"
          name="time"
          onChange={handleChange}
          value={inputs.time}
          className="addTime-field"
          required
        ></input>
        <br></br>
        <br></br>
        <label className="label-addTime">Address : </label>
        <br />
        <input
          type="text"
          name="address"
          onChange={handleChange}
          value={inputs.address}
          className="addTime-field"
          required
        ></input>
          <br></br>
          <br></br>
          {/* Rest of your form elements */}
          <div className="btn-addTime-container">
            <button className="btn-addTime">Submit</button>
          </div>
          <br></br>
        </form>
      </div>
    </div>
  );
}

export default AddTimetable;