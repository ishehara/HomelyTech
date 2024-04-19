import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

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
      history("/timetabledetails");
    } catch (error) {
      console.error("Error updating timetable:", error);
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
      <h1>Update Timetable</h1>
      <form onSubmit={handleSubmit}>
        {inputs && (
          <>
            <label>Name : </label>
            <br />
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              required
            ></input>
            <br />
            <label>Technician ID : </label>
            <br />
            <input
              type="text"
              name="technicianId"
              onChange={handleChange}
              value={inputs.technicianId}
              required
            ></input>
            <br />
            <label>Phone Number : </label>
            <br />
            <input
              type="tel"
              name="phoneNo"
              onChange={handleChange}
              value={inputs.phoneNo}
              required
            ></input>
            <br />
            <label>Date : </label>
            <br />
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={inputs.date}
              required
            ></input>
            <br />
            <label>Time : </label>
            <br />
            <input
              type="time"
              name="time"
              onChange={handleChange}
              value={inputs.time}
              required
            ></input>
            <br />
            <label>Address : </label>
            <br />
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={inputs.address}
              required
            ></input>
            <br />
            {/* Add other input fields similarly */}
          </>
        )}
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default UpdateTimetable;
