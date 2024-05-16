import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './InsertDetails.css';
import Navbar from "../../navbar/navbar"; // Adjusted import path

function InsertDetails() {
    const [inputs, setInputs] = useState({
        itemName: '',
        itemBrand: '',
        category: '',
        quantity: '',
        productCost: '',
        supplierName: '',
        supplierEmail: '',
        date: new Date().toISOString().slice(0, 10), // Current date in "YYYY-MM-DD" format,
    });

    useEffect(() => {
        // Set the current date when the component mounts
        setInputs(prevState => ({
            ...prevState,
            date: new Date().toISOString().slice(0, 10)
        }));
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const navigate = useNavigate();

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
        console.log(inputs);
        try {
            await sendRequest();
            navigate('/displayDetails');
            alert("Details Added Successfully!");
        } catch (error) {
            console.error('Error!:', error);
        }
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/invetory", {
            itemName: inputs.itemName,
            itemBrand: inputs.itemBrand,
            category: inputs.category,
            quantity: parseInt(inputs.quantity),
            productCost: parseFloat(inputs.productCost),
            supplierName: inputs.supplierName,
            supplierEmail: inputs.supplierEmail,
            date: inputs.date,
        }).then(res => res.data);
    }

    // Get today's date in the format "YYYY-MM-DD"
    const today = new Date().toISOString().split('T')[0];

    return (
        <div>
            <Navbar />
            <div className="inventory-container">
                <h1>Insert Details</h1>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <br />
                    <input type="text" name="itemName" onChange={handleChange} value={inputs.itemName} required />
                    <br /><br />

                    <label>Brand:</label>
                    <br />
                    <input type="text" name="itemBrand" onChange={handleChange} value={inputs.itemBrand} required />
                    <br /><br />

                    <label>Category:</label>
                    <br />
                    <input type="text" name="category" onChange={handleChange} value={inputs.category} required />
                    <br /><br />

                    <label>Quantity:</label>
                    <br />
                    <input type="number" name="quantity" onChange={handleChange} value={inputs.quantity} required />
                    <br /><br />

                    <label>Product Cost:</label>
                    <br />
                    <input type="number" name="productCost" onChange={handleChange} value={inputs.productCost} required />
                    <br /><br />

                    <label>Supplier Name:</label>
                    <br />
                    <input type="text" name="supplierName" onChange={handleChange} value={inputs.supplierName} required />
                    <br /><br />

                    <label>Supplier Email:</label>
                    <br />
                    <input type="email" name="supplierEmail" onChange={handleChange} value={inputs.supplierEmail} required />
                    <br /><br />

                    <label>Date:</label>
                    <br />
                    <input type="date" name="date" onChange={handleChange} value={inputs.date} disabled />
                    <br /><br />

                    <button type="submit" className="inventory-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default InsertDetails;
