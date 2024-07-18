import { useContext } from "react";
import HeaderMenuContext from "../../contexts/HeaderMenuContext";

const Container = ({ children }) => {
    const {
        setIsMenuOpen,
        setIsPeripheryMenuOpen,
        setIsUserMenuOpen
    } = useContext(HeaderMenuContext);

    const closeMenus = () => {
        setIsMenuOpen(false);
        setIsPeripheryMenuOpen(false);
        setIsUserMenuOpen(false);
    }
    return (
        <div onClick={closeMenus}>
            {children}
        </div>
    );
};

export default Container;