import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './ProfilePage.css'


const ProfilePage = () => {
    const [selectedOption, setSelectedOption] = useState('personalDetails');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const renderContent = () => {
        switch (selectedOption) {
            case 'personalDetails':
                return (
                    <div className='personal-details-container'>
                        <h2 className='personal-details-header'>Profile Details</h2>
                        <ul className='profile-options'>
                            <li className='profile-option'><Link to="/change-password">Change Password</Link></li>
                            <li className='profile-option'>Edit Address</li>
                            <li className='profile-option'>Edit Phone Number</li>
                            <li className='profile-option'>Change Email</li>
                        </ul>
                    </div>
                );
            case 'myOrders':
                return (
                    <div>
                        <h2>My Orders</h2>
                        {/* Display user's orders here */}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="profile-page">
            <div className="options">
                <div
                    className={`option ${selectedOption === 'personalDetails' ? 'active' : ''}`}
                    onClick={() => handleOptionClick('personalDetails')}
                >
                    Profile Details
                </div>
                <div
                    className={`option ${selectedOption === 'myOrders' ? 'active' : ''}`}
                    onClick={() => handleOptionClick('myOrders')}
                >
                    My Orders
                </div>
                {/* Add more options here as needed */}
            </div>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
};

export default ProfilePage;
