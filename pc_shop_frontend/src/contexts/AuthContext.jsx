import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.jsx";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser, registerUser } from "../services/authService.jsx";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useLocalStorage('user', {});
    const navigate = useNavigate();

    const login = (username, password) => {
        loginUser(username, password).then(result => {
            if (result.token) {
                setUser(result);
                navigate('/');
            }

        }).catch(err => console.log(err))
    }
    const logout = (token) => {
        logoutUser(token).then(result => {
            setUser({});
            navigate('/');
        }).catch(err => console.log(err))
    }
    const register = (username, email, password, password_confirmation, phone) => {
        registerUser(username, email, password, password_confirmation, phone).then(result => {
            console.log(result);
            navigate('/login');
        }).catch(err => console.log(err))
    }


    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}