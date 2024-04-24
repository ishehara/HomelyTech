import React from "react";
import './aboutus.css';

export default function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-content">
        <h1 className="about-us-heading">About Us</h1>
        <p className="about-us-paragraph">
          Welcome to HomelyTech, your one-stop destination for homely basics
          technicians. Our platform connects you with skilled professionals in
          gardening, painting, electrical work, and mechanics, ensuring
          convenience and quality for all your home maintenance needs.
        </p>
      </div>

      <div>
        <h2 className="about-us-subheading">Welcome to HomelyTech!</h2>
        <p className="about-us-subparagraph">
          At HomelyTech, we're dedicated to simplifying your home maintenance
          needs. We understand that finding reliable technicians for everyday
          tasks can be a hassle. That's why we've created a platform that
          connects you with skilled professionals for all your homely needs.
        </p>

        <h3 className="about-us-subheading">Our Mission:</h3>
        <p className="about-us-subparagraph">
          Our mission is to revolutionize the way you manage your home
          maintenance. We strive to provide a seamless experience, from booking
          your service to the completion of the job. With HomelyTech, you can
          trust that your home is in good hands.
        </p>

        <h3 className="about-us-subheading">What We Offer:</h3>
        <ul className="about-us-subparagraph">
        <li>Expert Technicians: Our platform hosts a diverse range of skilled
          technicians, including electricians, painters, mechanicians,
          gardeners, plumbers, and more. Each technician is vetted for expertise
          and reliability, ensuring top-notch service every time.</li>
        <li>Variety of Services: Whether it's fixing a leaky faucet, painting your living
          room, or landscaping your garden, HomelyTech offers a wide array of
          homely-based services to cater to all your needs.</li> 
         <li>
         Convenience: Say goodbye to endless phone calls and inquiries. With HomelyTech, booking
          a service is as easy as a few clicks. Simply choose your desired
          service, select a time that works for you, and let us handle the rest.
         </li>
        </ul>
          

        <h3 className="about-us-subheading">Why Choose HomelyTech:</h3>
        <ul className="about-us-subparagraph"> {/* Start of unordered list */}
    <li>Reliability: We understand the importance of trust when it comes to your home. That's why we rigorously vet all our technicians to ensure they meet our high standards of professionalism and expertise.</li>
    <li>Transparency: No hidden costs or surprises. With HomelyTech, you'll always know what to expect, from pricing to the scope of work. We believe in transparent communication every step of the way.</li>
    <li>Customer Satisfaction: Your satisfaction is our priority. We're committed to delivering exceptional service that exceeds your expectations. If you're not happy, we'll work tirelessly to make it right.</li>
  </ul> {/* End of unordered list */}

        <h3 className="about-us-subheading">Get Started Today:</h3>
        <p className="about-us-subparagraph">
          Ready to experience the convenience of HomelyTech?
          Join thousands of
          satisfied customers who have entrusted us with their home maintenance
          needs. Simply browse our services, book your appointment, and let us
          take care of the rest.
        </p>

        <p className="about-us-subparagraph">
          At HomelyTech, we're not just a service provider - we're your partner in
          creating a happier, healthier home.
        </p>
      </div>
    </div>
  );
}
