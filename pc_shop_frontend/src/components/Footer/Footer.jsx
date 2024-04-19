import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { name, email, message };
        console.log(formData);
        // TODO: Implement the email sending logic on your server
        // Example: fetch('/sendEmail', { method: 'POST', body: JSON.stringify(formData), headers: { 'Content-Type': 'application/json' }});
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        </footer>
    );
};

export default Footer;
