import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import './Contactus.css';
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';


function Contactus() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_qhl39r3', 'template_kb021x6', form.current, {
        publicKey: 'GNmOzRqxD4EfWtmyn',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert("success")
          form.current.reset();


        },
        (error) => {
          console.log('FAILED...', error.text);
          alert("Not Send")
        },
      );
  };
  return (
    <div>
     <Navbar/>
      <div className="contactus-container">
        <h1 className="contactus-title">Contact Us</h1>
        <form ref={form} onSubmit={sendEmail} className="contactus-form">
          <label>Name</label>
          <input type="text" name="user_name" id="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" id="user_email" />
          <label>Message</label>
          <textarea name="message" id="user_message" rows="4" />
          <input type="submit" value="Send" />
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default Contactus
