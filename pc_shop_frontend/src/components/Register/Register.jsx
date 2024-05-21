import { useContext } from 'react';
import './Register.css'
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

function Register() {
    const { register } = useContext(AuthContext);

    const registerHandler = (e) => {
        e.preventDefault();
        e.preventDefault();
        const { username, email, password, password_confirmation, phone } = Object.fromEntries(new FormData(e.target));
        register(username, email, password, password_confirmation, phone);
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password_confirmation').value = '';
        document.getElementById('phone').value = '';
    }

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={registerHandler}>
                <div className="register-form-group">
                    <label htmlFor="username">Username*</label>
                    <input
                        className='register-username'
                        type="text"
                        id="username"
                        name="username"
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label htmlFor="email">Email*</label>
                    <input
                        className='register-email'
                        type="email"
                        id="email"
                        name="email"
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        className='register-phone'
                        type="tel"
                        id="phone"
                        name="phone"
                    />
                </div>
                <div className="register-form-group">
                    <label htmlFor="password">Password*</label>
                    <input
                        className='register-password'
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label htmlFor="password_confirmation">Confirm password*</label>
                    <input
                    className='register-password_confirmation'
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        required
                    />
                </div>
                <div className="register-form-group">
                    <button type="submit">Register</button>
                </div>
                <div className="form-options">
                    <p>
                        You already have an account? <Link to="/login">Login to your account</Link>
                    </p>

                </div>
            </form>
        </div>
    )
}


export default Register;