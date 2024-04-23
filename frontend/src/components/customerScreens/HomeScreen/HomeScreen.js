import React, { useEffect, useState } from 'react';
import './HomeScreen.css'; // Make sure the CSS file is properly imported
import img2 from './HomeScreenImages/img1.jpeg';
import img1 from './HomeScreenImages/img2.jpg';
import img3 from './HomeScreenImages/img6.jpg';

function HomeScreen() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
      let i;
      const slides = document.getElementsByClassName("mySlides");
      const dots = document.getElementsByClassName("dot");

      // Check if slides and dots are loaded
      if (!isLoaded && slides.length && dots.length) {
        setIsLoaded(true);
      }

      if (!isLoaded) {
        // If slides or dots are not yet available, try again after a short delay
        setTimeout(showSlides, 3000);
        return;
      }
      
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
      }
      slideIndex++;
      if (slideIndex > slides.length) {slideIndex = 1}    
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " active";
      setTimeout(showSlides, 2000); // Change image every 2 seconds
    }
  }, [isLoaded]); // Re-run effect when isLoaded changes

  return (
    <div>
        <br/><br/>
     
      <div className="slideshow-container">
        <div className="mySlides fade">
          <div className="numbertext">1 / 3</div>
          <img src={img2} style={{ width: '100%' }} alt="Slide 1" />
          <div className="text">Welcome to HomelyTech
           </div>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">2 / 3</div>
          <img src={img1} style={{ width: '100%' }} alt="Slide 2" />
          <div className="text"> Explore our services.</div>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">3 / 3</div>
          <img src={img3} style={{ width: '100%' }} alt="Slide 3" />
          <div className="text">Find solutions as your needs.</div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <span className="dot"></span> 
        <span className="dot"></span> 
        <span className="dot"></span> 
      </div>

     
    </div>
  );
}

export default HomeScreen;
