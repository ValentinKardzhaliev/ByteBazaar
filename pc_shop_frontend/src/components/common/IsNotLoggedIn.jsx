import { useContext } from "react"
import AuthContext from "../../contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

const IsNotLoggedIn = () => {
    const { user } = useContext(AuthContext);

    if (!user.token) {
        return <Navigate to='/login' replace />
    }

    return <Outlet />
}

export default IsNotLoggedIn;