import React, { useEffect, useState, useRef } from 'react';
//import Nav from '../Nav/Nav';
import  axios  from 'axios';
import Sprovider from '../Sprovider/Sprovider';
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';

const URL ="http://localhost:5000/sproviders"

const fetchHandler = async () =>{
    return await axios.get(URL).then((res) => res.data);
  }

  function Sproviders() {

    const [sproviders, setSproviders] = useState();
    useEffect(() => {
      fetchHandler().then((data) => setSproviders(data.sproviders));
    },[])

    return(
        <div>
            <Navbar/>
            <h1>service Provider Details Display page</h1>
            <div>
                {sproviders && sproviders.map((sprovider,i) =>(
                    <div key={i}>
                        <Sprovider sprovider={sprovider}/>
                </div>
                ))}
             </div>
             <Footer/>
             </div>
    )}
           
    
  




export default Sproviders;

