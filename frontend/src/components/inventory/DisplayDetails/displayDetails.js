import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DisplayDetails.css';
// import Nav from '../Nav/nav';
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
            {/* <Nav /> */}
            <div className="display-details-container">
                <h1>Display Details</h1>
                <input
                    type="text"
                    name="search"
                    placeholder="Search Details"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Search</button>
                

                <table ref={ComponentsRef}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Product Cost</th>
                            <th>Supplier Name</th>
                            <th>Supplier Email</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((detail, index) => (
                            <tr key={index}>
                                <td>{detail._id}</td>
                                <td>{detail.itemName}</td>
                                <td>{detail.itemBrand}</td>
                                <td>{detail.category}</td>
                                <td>{detail.quantity}</td>
                                <td>{detail.productCost}</td>
                                <td>{detail.supplierName}</td>
                                <td>{detail.supplierEmail}</td>
                                <td>{detail.date}</td>
                                <td>
                                    <Link to={`/displayDetails/${detail._id}`}>Update</Link>
                                    <button onClick={() => deleteHandler(detail._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {noResults && <p>No results found.</p>}
            </div>
            <button onClick={handlePrint}>Download Inventory Report </button>
            <button onClick={checkStockLevel}>Check Stock Level</button>
            <Link to={"/addDetails"}>Add Inventory Details</Link>
            
        </div>
    );
}

export default DisplayDetails;
