import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.css'

function Header() {

    return (
        <header className="sticky-top">
            <nav className="navbar">
                <ul>
                    <li>
                        <a href="/login">
                            <FontAwesomeIcon icon={faUser} />
                        </a>
                    </li>
                    <li>
                        <a href="#cart">
                            <FontAwesomeIcon icon={faCartShopping} />
                        </a>
                    </li>
                    <li>
                        <a href="#likes">
                            <FontAwesomeIcon icon={faHeart} />
                        </a>
                    </li>
                    <li id="home">
                        <a href="/">ByteBazaar</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}


export default Header;