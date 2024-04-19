import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './UpdateDetails.css'; // Import the CSS file

function UpdateDetails() {

    const [inputs,setInputs]=useState({});
    const history = useNavigate();
    const id = useParams().id;

    useEffect(()=>{
        const fetchHandler = async()=>{
            await axios 
            .get(`http://localhost:5000/invetory/${id}`)
            .then((res)=>res.data)
            .then((data)=>setInputs(data.inventory));
        };
        fetchHandler();
    },[id]);

    const sendRequest = async()=>{
        await axios
        .put(`http://localhost:5000/invetory/${id}`,{
                itemName: inputs.itemName, 
                itemBrand: inputs.itemBrand,
                category: inputs.category,
                quantity: parseInt(inputs.quantity),
                productCost: parseFloat(inputs.productCost),
                supplierName: inputs.supplierName, 
                supplierEmail: inputs.supplierEmail, 
                date: inputs.date,
        })
        .then((res)=>res.data);
    }

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>
        history("/displayDetails"));
    };

  return (
    <div className="container">
      <h1>Update details</h1>
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
                <input type="date" name="date" onChange={handleChange} value={inputs.date ? inputs.date.slice(0, 10) : ''} required />
                <br/><br/>


                <button type="submit">Submit</button>
            </form>
    </div>
  )
}

export default UpdateDetails
