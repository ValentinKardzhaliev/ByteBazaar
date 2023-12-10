import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Header.css'
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

function Header() {
    const { user } = useContext(AuthContext);

    return (
        <header className="sticky-top">
            <nav className="navbar">
                <ul>
                    {user.token
                        ?
                        <>
                            <li>
                                <Link to="/logout">
                                    <FontAwesomeIcon icon={faSignOut} />
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart">
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </Link>
                            </li>
                            <li>
                                <Link to="/likes">
                                    <FontAwesomeIcon icon={faHeart} />
                                </Link>
                            </li>

                        </>
                        :
                        <li>
                            <Link to="/login">
                                <FontAwesomeIcon icon={faUser} />
                            </Link>
                        </li>

                    }

                    <li id="home">
                        <Link to="/">ByteBazaar</Link>
                    </li>
                    {user.token
                        ?
                        <li id="userName">
                            <Link to="/">Welcome, {user.username}!</Link>
                        </li>
                        :
                        <></>
                    }

                </ul>
            </nav>
        </header>
    )
}


export default Header;