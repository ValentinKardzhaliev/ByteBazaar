import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser, registerUser } from "../services/authService.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.jsx";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage('user', {});

    const login = (username, password) => {
        return loginUser(username, password)
            .then(user => {
                if (user.token) {
                    setUser(user);
                    navigate('/');
                } else {
                    throw new Error('Invalid response from server');
                }
            })
            .catch(err => {
                console.error('Login failed:', err);
                throw err;
            });
    };

    const logout = (token) => {
        logoutUser(token).then(result => {
            setUser({});
            navigate('/');
        }).catch(err => console.log(err))
    };

    const register = async (username, email, password, password_confirmation, phone) => {
        try {
            const result = await registerUser(username, email, password, password_confirmation, phone);
            console.log('successful')
            navigate('/login');
            return result;
        } catch (error) {
            console.log('error')
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}