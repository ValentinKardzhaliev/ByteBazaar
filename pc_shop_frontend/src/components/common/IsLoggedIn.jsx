import { Outlet,  } from "react-router-dom";
import { useContext } from "react"
import AuthContext from "../../contexts/AuthContext"
import Login from "../Login/Login";

const IsLoggedIn = () => {
    const { user } = useContext(AuthContext);
    if (!user.token) {

        return <Login />
    }

    return <Outlet />
}

export default IsLoggedIn;