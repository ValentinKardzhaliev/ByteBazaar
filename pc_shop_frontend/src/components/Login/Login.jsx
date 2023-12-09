import { useContext } from 'react';
import { loginUser } from '../../services/authService';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

function Login() {
    const { login } = useContext(AuthContext);

    const loginHandler = (e) => {
        e.preventDefault();
        const { username, password } = Object.fromEntries(new FormData(e.target));
        login(username, password);
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={loginHandler}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <div className="form-group">
                    <p>
                        <Link to="/forgot-password">Forgot your password?</Link>
                    </p>
                    <button type="submit">Login</button>
                </div>
                <div className="form-options">
                    <p>
                        Don't have an account? <Link to="/register">Create one</Link>
                    </p>

                </div>
            </form>
        </div>
    )
}


export default Login;