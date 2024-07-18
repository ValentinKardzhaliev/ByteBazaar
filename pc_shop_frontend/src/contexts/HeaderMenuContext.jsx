import { createContext, useState } from "react";

const HeaderMenuContext = createContext();

export default HeaderMenuContext;

export const HeaderMenuProvider = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPeripheryMenuOpen, setIsPeripheryMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
        setIsPeripheryMenuOpen(false);
    };

    const togglePeripheryMenu = () => {
        setIsPeripheryMenuOpen(prev => !prev);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(prev => !prev);
    };

    return (
        <HeaderMenuContext.Provider value={{
            isMenuOpen,
            isPeripheryMenuOpen,
            isUserMenuOpen,
            toggleMenu,
            togglePeripheryMenu,
            toggleUserMenu,
            setIsMenuOpen,
            setIsPeripheryMenuOpen,
            setIsUserMenuOpen

        }}>
            {children}
        </HeaderMenuContext.Provider>
    )
}