import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import AuthContext from '../../contexts/AuthContext';

function Register() {
    const { register } = useContext(AuthContext);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const registerHandler = async (e) => {
        e.preventDefault();
        const { username, email, password, password_confirmation, phone } = Object.fromEntries(new FormData(e.target));

        try {
            await register(username, email, password, password_confirmation, phone);
            setSuccessMessage('Registration successful!');
            setErrorMessage('');
        } catch (error) {
            console.log(error);
            setErrorMessage('Registration failed. Please try again.');
            setSuccessMessage('');
        }

        e.target.reset();
    }

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form className="register-form" onSubmit={registerHandler}>
                <div className="register-form-group">
                    <label htmlFor="username">Username*</label>
                    <input
                        className='register-input'
                        type="text"
                        id="username"
                        name="username"
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label htmlFor="email">Email*</label>
                    <input
                        className='register-input'
                        type="email"
                        id="register-email"
                        name="email"
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        className='register-input'
                        type="tel"
                        id="phone"
                        name="phone"
                    />
                </div>
                <div className="register-form-group">
                    <label htmlFor="password">Password*</label>
                    <input
                        className='register-input'
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label htmlFor="password_confirmation">Confirm password*</label>
                    <input
                        className='register-input'
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        required
                    />
                </div>
                <div className="register-form-group">
                    <button type="submit" className="register-button">Register</button>
                </div>
                {successMessage && <p className="registration-success-message">{successMessage}</p>}
                {errorMessage && <p className="registration-error-message">{errorMessage}</p>}
                <div className="register-form-options">
                    <p>
                        You already have an account? <Link to="/login" className="form-link">Login to your account</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register;