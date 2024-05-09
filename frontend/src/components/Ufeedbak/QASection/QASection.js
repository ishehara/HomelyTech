import React, { useState } from 'react';
import './QASection.css';
import Navbar from '../../customerScreens/navbar';
import Footer from '../../customerScreens/Footer/footer';

const questionsAndAnswers = [
  {
    question: "How can I update my account information?",
    answer: "You can update your account information by navigating to the settings page and selecting the 'Edit Profile' option. From there, you can modify your details as needed."
  },
  {
    question: "Where can I find information about upcoming events?",
    answer: "You can find information about upcoming events by visiting the 'Events' section on our website or app. We regularly update the calendar with new events and activities."
  },
  {
    question: "What are the accepted payment methods?",
    answer: "We accept various payment methods, including credit/debit cards, PayPal, and bank transfers. You can choose the payment option that is most convenient for you during checkout."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can contact our customer support team by clicking on the 'Support' or 'Help' option in the navigation menu. Alternatively, you can email us at support@example.com or call our toll-free number."
  },
  {
    question: "Is there a mobile app available for download?",
    answer: "Yes, we have a mobile app available for download on both iOS and Android devices. You can find the app in the App Store or Google Play Store by searching for 'Our App Name'."
  },
  {
    question: "What are the operating hours for customer support?",
    answer: "Our customer support team is available to assist you from Monday to Friday, 9:00 AM to 6:00 PM EST. For urgent inquiries outside of these hours, please leave us a message, and we will get back to you as soon as possible."
  },
  {
    question: "How can I track my order shipment?",
    answer: "You can track your order shipment by logging into your account and navigating to the 'Orders' section. From there, you can view the status of your order and track its progress in real-time."
  },
  {
    question: "What should I do if I receive a damaged item?",
    answer: "If you receive a damaged item, please contact our customer support team immediately with details and photos of the damage. We will arrange for a replacement or refund as per our return policy."
  },
  {
    question: "Are there any upcoming promotions or discounts?",
    answer: "Yes, we regularly offer promotions and discounts on our products and services. To stay updated on the latest deals, subscribe to our newsletter or follow us on social media."
  },
  {
    question: "How can I unsubscribe from marketing emails?",
    answer: "You can unsubscribe from marketing emails by clicking on the 'Unsubscribe' link at the bottom of any promotional email you receive from us. Alternatively, you can update your email preferences in your account settings."
  },
  {
    question: "Can I change or cancel my order after it has been placed?",
    answer: "Once an order has been placed, changes or cancellations may not be possible, especially if the order has already been processed. However, please contact us immediately, and we will do our best to accommodate your request."
  },
  {
    question: "Where can I find information about your privacy policy?",
    answer: "You can find information about our privacy policy by visiting the 'Privacy Policy' page on our website. We take your privacy and security seriously and adhere to strict guidelines to protect your personal information."
  },
  {
    question: "How do I apply for a job or internship at your company?",
    answer: "You can apply for a job or internship at our company by visiting the 'Careers' section on our website. We regularly post job openings and internship opportunities, and you can submit your application online through the provided form."
  },
  {
    question: "What measures are in place to ensure data security?",
    answer: "We employ various measures to ensure data security, including encryption, firewalls, and regular security audits. Additionally, we comply with industry standards and regulations to safeguard your sensitive information."
  },
  {
    question: "How can I provide feedback or suggestions for improvement?",
    answer: "We value your feedback and suggestions for improvement. You can submit your feedback through the 'Feedback' form on our website or app, or you can email us directly at feedback@example.com. We appreciate your input!"
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we offer international shipping to select countries. During checkout, you can enter your shipping address to see if international shipping is available for your location. Please note that additional fees and customs duties may apply."
  },
  {
    question: "How can I change my email address or password?",
    answer: "You can change your email address or password by logging into your account and accessing the 'Account Settings' or 'Security' section. From there, you can update your information as needed."
  },
  {
    question: "What is your policy on returns and exchanges?",
    answer: "Our policy on returns and exchanges allows you to return or exchange eligible items within 30 days of purchase. Please review our detailed return policy on our website for more information."
  },
  {
    question: "Are there any membership or loyalty programs available?",
    answer: "Yes, we offer a membership or loyalty program that provides exclusive benefits, such as discounts, rewards points, and special offers. You can sign up for our membership program on our website or app to start enjoying these benefits."
  },
  {
    question: "How can I collaborate or partner with your company?",
    answer: "If you're interested in collaborating or partnering with our company, please reach out to our business development team at partnerships@example.com. We're always open to exploring new opportunities and partnerships."
  }
];


function QASection() {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleQuestionChange = (event) => {
    setSelectedQuestion(event.target.value);
    setSearchTerm(''); // Reset search term when a question is selected
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedQuestion(''); // Reset selected question when search changes
  };

  const handleSearch = () => {
    const filteredQas = questionsAndAnswers.filter(qa =>
      qa.question.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredQas);
  };

  const getAnswer = () => {
    if (selectedQuestion) {
      const selectedQa = questionsAndAnswers.find(qa => qa.question === selectedQuestion);
      return selectedQa ? selectedQa.answer : 'Please select a valid question.';
    } else if (searchResults.length > 0) {
      return searchResults.map(qa => (
        <div key={qa.question}>
          <h3>{qa.question}</h3>
          <p>{qa.answer}</p>
        </div>
      ));
    } else {
      return 'No matching question found.';
    }
  };

  return (
    <div className="qa-container">
      <Navbar />
      <h1>Q&A</h1>
      <input
        type="text"
        placeholder="Search questions..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button onClick={handleSearch}>Search</button>
      <select onChange={handleQuestionChange} value={selectedQuestion}>
        <option value="">Select a question</option>
        {questionsAndAnswers.map((qa, index) => (
          <option key={index} value={qa.question}>{qa.question}</option>
        ))}
      </select>
      <div className="answer">
        {getAnswer()}
      </div>
      <div className="contact-options">
        <p>For more clarification, you can contact us through:</p>
        <button onClick={() => window.location = 'mailto:homlytec@gmail.com'}>Email Us (homlytec@gmail.com)</button>
        <button onClick={() => window.open('https://wa.me/26761442223', '_blank')}>WhatsApp Us (076 1442223)</button>
        <button onClick={() => window.open('tel:+0112345325')}>Call Hotline (011 2345325)</button>
      </div>
      <br/>
      <Footer/>
    </div>
  );
}

export default QASection;
