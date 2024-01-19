import { characteristicsLogic } from '../../../utils/characteristicsLogic';
import './Keyboard.css';
import { Link } from 'react-router-dom';

function Keyboard(props) {
    let characteristics = characteristicsLogic(props);
    let typeOfProduct = props.product.type;
    // Render only the first image
    const firstImage = props.product.images.length > 0 ? (
        <img src={`http://localhost:8000${props.product.images[0].image}`} alt="Product Image" className="product-image" />
    ) : null;

    return (
        <li className="keyboard-item">
            {firstImage}
            <div className="keyboard-details">
                <h2 className="keyboard-name">{props.product.name}</h2>
            </div>
            <ul className='characteristics'>
                {characteristics[typeOfProduct].map((c, index) => <li key={index}>{c}</li>)}
            </ul>
            <span className="keyboard-price"><p>$ {props.product.price}</p></span>
            <Link to={`/products/${props.product.type}/${props.product._id}`} className="keyboard-link">Details</Link>
        </li>
    );
}

export default Keyboard;
