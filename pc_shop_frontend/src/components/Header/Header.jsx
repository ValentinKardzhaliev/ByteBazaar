import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faUser, faSignOut, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm'
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import './Header.css';

function Header() {
    const { user } = useContext(AuthContext);

    return (
        <header className="sticky-top">
            <nav className="navbar">
                <div className="navbar-element-container">
                    <div className="home">
                        <Link to="/">ByteBazaar</Link>
                    </div>
                    <div className="category-menu">
                        <Link to='#'>
                            <FontAwesomeIcon icon={faBars} />
                            <div className="category-menu-text">
                                Menu
                            </div>
                        </Link>
                    </div>
                    <div className="search-bar-section">
                        <SearchForm />
                    </div>
                    <div className="navbar-right-side">
                        {user.token ? (
                            <>
                                <Link to="/logout">
                                    <FontAwesomeIcon icon={faSignOut} />
                                </Link>
                                <Link to="/cart">
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </Link>


                                <Link to="/likes">
                                    <FontAwesomeIcon icon={faHeart} />
                                </Link>

                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <FontAwesomeIcon icon={faUser} />
                                </Link>


                                <Link to="/cart">
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </Link>


                                <Link to="/likes">
                                    <FontAwesomeIcon icon={faHeart} />
                                </Link>

                            </>
                        )}

                    </div>
                </div>
            </nav>
        </header >
    );
}

export default Header;
