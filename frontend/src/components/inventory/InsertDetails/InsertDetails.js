import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './InsertDetails.css'; 

function InsertDetails() {
    const [inputs, setInputs] = useState({
        itemName: '',
        itemBrand: '', 
        category: '', 
        quantity: '', 
        productCost: '',
        supplierName: '', 
        supplierEmail: '',
        date: '',
    });

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
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

    return (
        <div>
            <div className="container">
                <h1>Insert Details</h1>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <br/>
                    <input type="text" name="itemName" onChange={handleChange} value={inputs.itemName} required />
                    <br/><br/>

                    <label>Brand:</label>
                    <br/>
                    <input type="text" name="itemBrand" onChange={handleChange} value={inputs.itemBrand} required />
                    <br/><br/>

                    <label>Category:</label>
                    <br/>
                    <input type="text" name="category" onChange={handleChange} value={inputs.category} required />
                    <br/><br/>

                    <label>Quantity:</label>
                    <br/>
                    <input type="number" name="quantity" onChange={handleChange} value={inputs.quantity} required />
                    <br/><br/>

                    <label>Product Cost:</label>
                    <br/>
                    <input type="number" name="productCost" onChange={handleChange} value={inputs.productCost} required />
                    <br/><br/>

                    <label>Supplier Name:</label>
                    <br/>
                    <input type="text" name="supplierName" onChange={handleChange} value={inputs.supplierName} required />
                    <br/><br/>

                    <label>Supplier Email:</label>
                    <br/>
                    <input type="email" name="supplierEmail" onChange={handleChange} value={inputs.supplierEmail} required />
                    <br/><br/>

                    <label>Date:</label>
                    <br/>
                    <input type="date" name="date" onChange={handleChange} value={inputs.date} required />
                    <br/><br/>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default InsertDetails;
