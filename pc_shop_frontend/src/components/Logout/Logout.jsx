import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

function Logout() {
    const { user, logout } = useContext(AuthContext);

    logout(user.token);

    return null;

}

export default Logout;