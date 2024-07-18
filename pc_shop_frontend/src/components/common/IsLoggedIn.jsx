import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react"
import AuthContext from "../../contexts/AuthContext"

const IsLoggedIn = () => {
    const { user } = useContext(AuthContext);

    if (!user.token) {
        return <Navigate to='/login' replace />
    }

    return <Outlet />
}

export default IsLoggedIn;