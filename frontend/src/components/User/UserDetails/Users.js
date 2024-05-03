import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import User from '../User/User';
import {useReactToPrint} from "react-to-print";
import './users.css';
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';

const URL ="http://localhost:5000/users";


const fetchHandler = async () =>{
  return await axios.get(URL).then((res) => res.data);
}

function Users() {

  const [users, setUsers] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  },[])

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Users Report",
    onafterprint:()=> alert("Users Report Successfully Download !"),
 });

//search function

 const [ searchQuery, setSearchQuery ] = useState("");
 const [ noResults, setNoResults ] = useState(false);

 const handleSearch = () => {
  fetchHandler().then((data) => {
  const filteredUsers = data.users.filter((user) =>
  Object.values(user).some((field)=>
  field.toString().toLowerCase().includes(searchQuery.toLowerCase())
))

setUsers(filteredUsers);
setNoResults(filteredUsers.length === 0);

  });
 };

//  //whatsapp details send function

//  const handleSendReport = ()=>{
//   //Create the WhatsApp Chat URL
//   const phoneNumber = "+94704494254";
//   const message = `selected User Reports`
//   const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
//     message
//   )}`;

//   //Open the WhatsAapp chat in new Window
//  window.open(WhatsAppUrl,"_blank");
// }
 
const isAdmin = sessionStorage.getItem('isAdmin');

if (isAdmin === 'true') {
  return (
    <div>
      <Navbar/>
      <h1 className="users-title">Users Details Display Page</h1>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Users Details"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button><br></br>
      <button onClick={handlePrint} className="download-button">Download Report</button><br></br>
      

      {noResults ? (
        <div>
          <p>No Users Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef}>
          {users && users.map((user, i) => (
            <div key={i}>
              <User user={user} />
            </div>
          ))}
        </div>
      )}
      <Footer/>
    </div>
  );
} else {
  // Render different content for non-admin users
  return (
      <div>
      <Navbar/>
      <h1 className="users-title">Access Denied</h1>
      <p>Sorry, you don't have permission to view this page.</p>
      <Footer/>
    </div>
  );
}

}

export default Users;