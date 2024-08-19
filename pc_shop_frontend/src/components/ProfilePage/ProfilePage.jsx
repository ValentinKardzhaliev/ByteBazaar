import React from 'react';
import { Link } from "react-router-dom";
import './ProfilePage.css';

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <div className="profile-heading-container">
                <span id="pathProfile"><Link className='mainPage' to={'/'}>Main page</Link> {'>'} Profile {'>'}</span>
                <h1 id="profile-heading">My Profile</h1>
            </div>
            <div className="profile-container">
                <div className="profile-left">
                    <p className='section-information'>Account Information</p>
                    <p className='section-information'>My Orders</p>
                    <p className='section-information'>Returning Products</p>
                    <p className='section-information'><Link className='leftLink' to={'/change-password'}>Change Password</Link></p>
                </div>
                <div className="profile-right">
                    <form id="forma">
                        <div className="form-group-row">
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" />
                            </div>
                            <div className="form-group">
                                <label>Phone:</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="form-group-row">
                            <div className="form-group">
                                <label>Surname:</label>
                                <input type="text" />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" />
                            </div>
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="save-button">Save</button>
                            <button type="button" className="cancel-button">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
