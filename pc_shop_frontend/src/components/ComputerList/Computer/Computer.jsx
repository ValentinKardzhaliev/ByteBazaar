import { characteristicsLogic } from '../../../utils/characteristicsLogic';
import './Computer.css';
import { Link } from 'react-router-dom';

function Computer(props) {
    let characteristics = characteristicsLogic(props);
    let typeOfProduct = props.product.type;
    // Render only the first image
    const firstImage = props.product.images.length > 0 ? (
        <img src={`http://localhost:8000${props.product.images[0].image}`} alt="Product Image" className="product-image" />
    ) : null;

    return (
        <li className="computer-item">
            {firstImage}
            <div className="computer-details">
                <h2 className="computer-name">{props.product.name}</h2>
            </div>
            <ul className='characteristics'>
                {characteristics[typeOfProduct].map((c, index) => <li key={index}>{c}</li>)}
            </ul>
            <span className="computer-price"><p>$ {props.product.price}</p></span>
            <Link to={`/products/${props.product.type}/${props.product._id}`} className="computer-link">Details</Link>
        </li>
    );
}

export default Computer;
