import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import './ChangePassword.css'
import { Link } from 'react-router-dom';
import { changePasswordUser } from '../../services/authService';
import AuthContext from '../../contexts/AuthContext';

function ChangePassword() {
    const { user } = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        changePasswordUser(user.token, oldPassword, newPassword)
            .then(() => {
                alert('Password changed successfully');
                setOldPassword('');
                setNewPassword('');
            }
            )
            .catch(err => console.log(err))
    }

    return (
        <>
            <Link id='backBtn' to={'/profile'} className='back-btn'>
                <span><FontAwesomeIcon icon={faBackward} /> Back</span>
            </Link>
            <div className="change-password-container">
                <h2 className="change-password-title">Change Password</h2>
                <form onSubmit={handleSubmit} className="change-password-form">
                    <div className="password-field">
                        <label htmlFor="old_password" className="password-label">Old Password:</label>
                        <input
                            type="password"
                            id="old_password"
                            value={oldPassword}
                            onChange={handleOldPasswordChange}
                            required
                            className="password-input"
                        />
                    </div>
                    <div className="password-field">
                        <label htmlFor="new_password" className="password-label">New Password:</label>
                        <input
                            type="password"
                            id="new_password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            required
                            className="password-input"
                        />
                    </div>
                    <button type="submit" className="password-submit-button">Change</button>
                </form>
            </div>
        </>
    );
}

export default ChangePassword;