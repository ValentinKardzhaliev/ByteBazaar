import { Link } from 'react-router-dom';
import './ProductBar.css';

function ProductBar() {

    return (
        <nav className="navBar">
            <ul className="navBar-list">
                <li><Link to="/catalog/others">Others</Link></li>
                <li><Link to="/catalog/accessories">Accessories</Link></li>
                <li><Link to="/catalog/keyboards">Keyboards</Link></li>
                <li><Link to="/catalog/monitors">Monitors</Link></li>
                <li><Link to="/catalog/computers">Computers</Link></li>
            </ul>
        </nav>

    )
}


export default ProductBar;