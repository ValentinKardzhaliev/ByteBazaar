import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Header.css'

function Header() {

    return (
        <header className="sticky-top">
            <nav className="navbar">
                <ul>
                    <li>
                        <Link to="/login">
                            <FontAwesomeIcon icon={faUser} />
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
                    <li id="home">
                        <Link to="/">ByteBazaar</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}


export default Header;