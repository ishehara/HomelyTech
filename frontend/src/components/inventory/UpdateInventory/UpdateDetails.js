import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './UpdateDetails.css'; // Import the CSS file
import Navbar from "../../navbar/navbar"; // Adjusted import path

function UpdateDetails() {
    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/invetory/${id}`);
                setInputs(response.data.inventory);
            } catch (error) {
                console.error("Error fetching inventory details:", error);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5000/invetory/${id}`, {
                itemName: inputs.itemName,
                itemBrand: inputs.itemBrand,
                category: inputs.category,
                quantity: parseInt(inputs.quantity),
                productCost: parseFloat(inputs.productCost),
                supplierName: inputs.supplierName,
                supplierEmail: inputs.supplierEmail,
                date: inputs.date,
            });
            alert("Details updated successfully!");
            return true; // Returning true to indicate successful update
        } catch (error) {
            console.error("Error updating details:", error);
            alert("Failed to update details. Please try again.");
            return false; // Returning false to indicate failed update
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if the value is negative for quantity and product cost
        if ((name === 'quantity' || name === 'productCost') && parseFloat(value) < 0) {
            // If the value is negative, set it to 0
            setInputs((prevState) => ({
                ...prevState,
                [name]: '0', // Set to 0
            }));
        } else {
            // Otherwise, update the state normally
            setInputs((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateSuccessful = await sendRequest();
        if (updateSuccessful) {
            history("/displayDetails");
        }
    };

    
    // Get today's date in the format "YYYY-MM-DD"
    const today = new Date().toISOString().split('T')[0];

    return (
        <div>
            <Navbar />
            <div className="container-Inventory">
                <h1>Update details</h1>
                <form onSubmit={handleSubmit}>
                    <label className="label-i">Name:</label>
                    <br />
                    <input type="text" name="itemName" onChange={handleChange} value={inputs.itemName} required />
                    <br /><br />

                    <label className="label-i">Brand:</label>
                    <br />
                    <input type="text" name="itemBrand" onChange={handleChange} value={inputs.itemBrand} required />
                    <br /><br />

                    <label className="label-i">Category:</label>
                    <br />
                    <input type="text" name="category" onChange={handleChange} value={inputs.category} required />
                    <br /><br />

                    <label className="label-i">Quantity:</label>
                    <br />
                    <input type="number" name="quantity" onChange={handleChange} value={inputs.quantity} required />
                    <br /><br />

                    <label className="label-i">Product Cost:</label>
                    <br />
                    <input type="number" name="productCost" onChange={handleChange} value={inputs.productCost} required />
                    <br /><br />

                    <label className="label-i">Supplier Name:</label>
                    <br />
                    <input type="text" name="supplierName" onChange={handleChange} value={inputs.supplierName} required />
                    <br /><br />

                    <label className="label-i">Supplier Email:</label>
                    <br />
                    <input type="email" name="supplierEmail" onChange={handleChange} value={inputs.supplierEmail} required />
                    <br /><br />

                    <label className="label-i">Date:</label>
                    <br />
                    <input type="date" name="date" onChange={handleChange} value={inputs.date ? inputs.date.slice(0, 10) : ''} disabled />
                    <br /><br />

                    <button className="btn-Inventory" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateDetails;
