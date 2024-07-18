import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"
import './Footer.css';

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
        <footer className="custom-footer">
            <div className="custom-footer-contact-content">
                <div className="custom-contact-ways">
                    <h2>Contact Us</h2>
                    <div className="custom-contact-social-icons">
                        <FontAwesomeIcon icon={faFacebook} className='custom-contact-icon' />
                        <FontAwesomeIcon icon={faInstagram} className='custom-contact-icon' />
                        <FontAwesomeIcon icon={faLinkedin} className='custom-contact-icon' />
                        <FontAwesomeIcon icon={faGithub} className='custom-contact-icon' />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='custom-contact-form'>
                    <div className="custom-name-email-group">
                        <div className="custom-form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="custom-input" />
                        </div>
                        <div className="custom-form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="custom-input" />
                        </div>
                    </div>
                    <div className="custom-form-group custom-message-container">
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="custom-textarea" />
                    </div>
                    <div className="custom-submit-contact-container">
                        <button type="submit" className="custom-submit-button">Send</button>
                    </div>
                </form>
            </div>
            <div className="custom-footer-info-content">
                <div className="custom-footer-lists-container">
                    <div className="custom-footer-about">
                        <h3>ByteBazaar</h3>
                        <ul className='custom-about-list'>
                            <li>About us</li>
                            <li>Work with us</li>
                            <li>News</li>
                            <li>Terms and Conditions</li>
                        </ul>
                    </div>
                    <div className="custom-footer-about">
                        <h3>Contacts</h3>
                        <ul className='custom-about-list'>
                            <li>Contacts</li>
                            <li>Shops</li>
                            <li>Repairs</li>
                        </ul>
                    </div>
                    <div className="custom-footer-about">
                        <h3>For Clients</h3>
                        <ul className='custom-about-list'>
                            <li>Advice</li>
                            <li>Transport</li>
                            <li>Delivery of orders</li>
                            <li>Services</li>
                            <li>Returning a product</li>
                            <li>Refunds</li>
                        </ul>
                    </div>
                    <div className="custom-footer-about">
                        <h3>General Information</h3>
                        <ul className='custom-about-list'>
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