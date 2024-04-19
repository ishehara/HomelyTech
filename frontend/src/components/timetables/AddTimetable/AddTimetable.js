import React, { useState } from "react";
//import Nav from "../Nav/Nav";
import { useNavigate } from "react-router";
import axios from "axios";
import "./addTimetable.css";

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

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/timetabledetails"));
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
    <div className="b1">
      {/* <Nav /> */}
      <h1><center>Add Timetable</center></h1>
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
        <div className="btn-addTime-container">
        <button className="btn-addTime">Submit</button>
        </div>
        <br></br>
      </form>
    </div>
  );
}

export default AddTimetable;
