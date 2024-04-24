import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DisplayDetails.css';
import Navbar from "../../navbar/navbar"; // Adjusted import path
import { useReactToPrint } from "react-to-print";

function DisplayDetails() {
    const [details, setDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/invetory");
            if (Array.isArray(response.data.invetory)) {
                setDetails(response.data.invetory);
            } else {
                console.error('Data received from the server is not an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteHandler = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/invetory/${id}`);
            fetchData(); // Refresh data after deletion
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleSearch = () => {
        const filteredInventory = details.filter((inventory) =>
            Object.values(inventory).some((field) =>
                field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setDetails(filteredInventory);
        setNoResults(filteredInventory.length === 0);
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        DocumentTitle: "Inventory Report",
        onafterprint: () => ("Inventory Report successfully downloaded!")
    });

    const checkStockLevel = async () => {
        try {
            const response = await axios.get("http://localhost:5000/invetory");
            if (Array.isArray(response.data.invetory)) {
                const lowStockItemsList = response.data.invetory.filter(item => item.quantity < 10);
                if (lowStockItemsList.length > 0) {
                    alert(`The following items are low in stock: ${lowStockItemsList.map(item => item.itemName).join(', ')}`);
                } else {
                    alert('All items are at a satisfactory stock level.');
                }
            } else {
                console.error('Data received from the server is not an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
         <Navbar/>

            <div className="display-details-container">
                <h1>Display Details</h1>
                <input
                    type="text"
                    name="search"
                    className="display-details-input"
                    placeholder="Search Details"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch} className="display-details-Btn">Search</button>
                

                <table ref={ComponentsRef} className="Inventory-timetable">
                    <thead>
                        <tr className="Inventory-tr">
                            <th className="Inventory-th">ID</th>
                            <th className="Inventory-th">Name</th>
                            <th className="Inventory-th">Brand</th>
                            <th className="Inventory-th">Category</th>
                            <th className="Inventory-th">Quantity</th>
                            <th className="Inventory-th">Product Cost</th>
                            <th className="Inventory-th">Supplier Name</th>
                            <th className="Inventory-th">Supplier Email</th>
                            <th className="Inventory-th">Date</th>
                            <th className="Inventory-th">Actions</th>

                            <th className="Inventory-th">Product Cost(Rs.)</th>

                        </tr>
                    </thead>
                    <tbody>
    {details.map((detail, index) => {
        // Calculate total cost for each item
        const totalCost = detail.quantity * detail.productCost;
        return (
            <tr key={index}>
                <td className="Inventory-td">{detail._id}</td>
                <td className="Inventory-td">{detail.itemName}</td>
                <td className="Inventory-td">{detail.itemBrand}</td>
                <td className="Inventory-td">{detail.category}</td>
                <td className="Inventory-td">{detail.quantity}</td>
                <td className="Inventory-td">{detail.productCost}</td>
                <td className="Inventory-td">{detail.supplierName}</td>
                <td className="Inventory-td">{detail.supplierEmail}</td>
                <td className="Inventory-td">{detail.date}</td>
                <td>
                    <Link to={`/displayDetails/${detail._id}`} className="display-details-a">Update</Link>
                    <button onClick={() => deleteHandler(detail._id)} className="display-details-Btn">Delete</button>
                </td>
                {/* Display total cost for each item */}
                <td className="Inventory-td">{totalCost}</td>
            </tr>
        );
    })}
    {/* Overall total cost row */}
    <tr>
        <td colSpan="10" className="Inventory-td">Overall Total Amount</td>
        <td className="Inventory-td" colSpan="2">
            {/* Calculate overall total cost */}
            {details.reduce((total, detail) => total + (detail.quantity * detail.productCost), 0)}
        </td>
    </tr>
</tbody>
                </table>
                {noResults && <p>No results found.</p>}
            </div>
            <button onClick={handlePrint} className="display-details-Btn">Download Inventory Report </button>
            <button onClick={checkStockLevel} className="display-details-Btn">Check Stock Level</button>
            <Link to={"/addDetails"} className="display-details-a">Add Inventory Details</Link>
            
        </div>
    );
}

export default DisplayDetails;
