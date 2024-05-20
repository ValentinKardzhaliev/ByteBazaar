import React, { useState, useEffect } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"


const Footer = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { name, email, message };

        try {
            const response = await fetch('https://bytebazaar.pythonanywhere.com/send_email/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Email sent successfully');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                console.error('Error sending email:', data.message);
            }
        } catch (error) {
            console.error('Error sending email:', error.message);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-contact-content">
                <div className="contact-ways">
                    <h2>Contact Us</h2>
                    <div className="contact-social-icons">
                        <FontAwesomeIcon icon={faFacebook} className='contact-icon' />
                        <FontAwesomeIcon icon={faInstagram} className='contact-icon' />
                        <FontAwesomeIcon icon={faLinkedin} className='contact-icon' />
                        <FontAwesomeIcon icon={faGithub} className='contact-icon' />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='contact-form'>
                    <div className="name-email-group">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group message-container">
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    <div className="submit-contact-container">
                        <button type="submit-contact">Send</button>
                    </div>
                </form>
            </div>
            <div className="footer-info-content">
                <div className="footer-lists-container">
                    <div className="footer-about">
                        <h3>ByteBazaar</h3>
                        <ul className='about-list'>
                            <li>About us</li>
                            <li>Work with us</li>
                            <li>News</li>
                            <li>Terms and Conditions</li>
                        </ul>
                    </div>
                    <div className="footer-about">
                        <h3>Contacts</h3>
                        <ul className='about-list'>
                            <li>Contacts</li>
                            <li>Shops</li>
                            <li>Repairs</li>
                        </ul>
                    </div>
                    <div className="footer-about">
                        <h3>For Clients</h3>
                        <ul className='about-list'>
                            <li>Advice</li>
                            <li>Transport</li>
                            <li>Delivery of orders</li>
                            <li>Services</li>
                            <li>Returning a product</li>
                            <li>Refunds</li>
                        </ul>
                    </div>
                    <div className="footer-about">
                        <h3>General Information</h3>
                        <ul className='about-list'>
                            <li>Help</li>
                            <li>How to order</li>
                            <li>Recycling</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
