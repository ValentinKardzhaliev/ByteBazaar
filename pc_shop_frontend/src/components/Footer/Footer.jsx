import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [csrfToken, setCsrfToken] = useState('');



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
            <div className="footer-content">
                <h2>Contact Us</h2>
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
        </footer>
    );
};

export default Footer;
