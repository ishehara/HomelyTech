import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './timetable.css';



function Timetable(props) {
  const { _id, name, technicianId, phoneNo, date, time, address } =
    props.timetable;
  const history = useNavigate();
  const [deleted, setDeleted] = useState(false); // State to track if item is deleted

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/timetables/${technicianId}`)
      .then((res) => res.data)
      .then(() => {
        setDeleted(true); // Update state after deletion
        history("/"); // You can remove this line
        history("/timetabledetails"); // You can remove this line
      })
      .catch(error => {
        console.error("Error deleting:", error);
      });
  };

  if (deleted) {
    // If item is deleted, don't render it
    return null;
  }

  return (
    
    <div className="table-container">
      <br></br>
      <table className="table"> {/* Add className attribute */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Technician ID</th>
            <th>Phone Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr key={_id}>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{technicianId}</td>
            <td>{phoneNo}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>{address}</td>
            <td>
              <Link className="update" to={`/timetabledetails/${technicianId}`}>
                Update
              </Link>
              <span className="action-line"></span>
              <button className="delete" onClick={deleteHandler}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
  );
}

export default Timetable;