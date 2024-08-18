import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import AuthContext from '../../contexts/AuthContext';
import { RouterContext } from '../../contexts/RouterContext';

function Login() {
    const { login } = useContext(AuthContext);
    let route = useContext(RouterContext);
    if (route.from == '/register') {
        route.from = '/'
    }

    const [errorMessage, setErrorMessage] = useState('');

    const loginHandler = async (e) => {
        e.preventDefault();
        const { username, password } = Object.fromEntries(new FormData(e.target));

        try {
            await login(username, password);
            setErrorMessage('');
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Login failed. Please try again.');
        }

        e.target.reset();
    };

    return (
        <>
            <Link id='backBtn' to={route.from} className='back-btn'>
                <span><FontAwesomeIcon icon={faBackward} /> Back</span>
            </Link>
            <div className="login-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={loginHandler}>
                    <div className="login-form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            className='login-username'
                            type="text"
                            id="username"
                            name="username"
                            required
                        />
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            className='login-password'
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                    </div>
                    {errorMessage && <p className="login-error-message">{errorMessage}</p>}
                    <div className="login-form-group">
                        <p className='login-forgot-password'>
                            <Link to="/forgot-password">Forgot your password?</Link>
                        </p>
                        <button type="submit">Login</button>
                    </div>
                    <div className="login-form-options">
                        <p>
                            Don't have an account? <Link to="/register">Create one</Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;