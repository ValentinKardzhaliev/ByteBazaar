import React from 'react';
import { Link, Routes, Route } from "react-router-dom";
import './ProfilePage.css';
import ChangePassword from '../ChangePassword/ChangePassword';

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <div className="profile-heading-container">
                <span id="pathProfile">
                    <Link className='mainPage' to={'/'}>Main page</Link> {'>'} Profile {'>'}
                </span>
                <h1 id="profile-heading">My Profile</h1>
            </div>
            <div className="profile-container">
                <div className="profile-left">
                    <p className='section-information'>
                        <Link className='leftLink' to={'/profile'}>Account Information</Link>
                    </p>
                    <p className='section-information'>
                        <Link className='leftLink' to={'/orders'}>My orders</Link>
                    </p>
                    <p className='section-information'>Returning Products</p>
                    <p className='section-information'>
                        <Link className='leftLink' to={'/profile/change-password'}>Change Password</Link>
                    </p>
                </div>

                <Routes>
                    {/* Default Profile form */}
                    <Route path="/" element={(
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
                    )} />

                    {/* Render ChangePassword Component */}
                    <Route path="change-password" element={<ChangePassword />} />
                </Routes>
            </div>
        </div>
    );
};

export default ProfilePage;