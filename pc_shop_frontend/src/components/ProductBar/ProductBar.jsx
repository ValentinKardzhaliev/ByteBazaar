import { Link } from 'react-router-dom';
import './ProductBar.css';

function ProductBar() {

    return (
        <nav className="navBar">
            <ul className="navBar-list">
                <li><Link to="/others">Others</Link></li>
                <li><Link to="/accessories">Accessories</Link></li>
                <li><Link to="/peripheries">Peripheries</Link></li>
                <li><Link to="/monitors">Monitors</Link></li>
                <li><Link to="/computers">Computers</Link></li>
            </ul>
        </nav>

    )
}


export default ProductBar;