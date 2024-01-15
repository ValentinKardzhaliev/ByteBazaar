import { characteristicsLogic } from '../../../utils/characteristicsLogic';
import './Product.css';
import { Link } from 'react-router-dom';

function Product(props) {
    let characteristics = characteristicsLogic(props);
    let typeOfProduct = props.product.type;
    // Render only the first image
    const firstImage = props.product.images.length > 0 ? (
        <img src={`http://localhost:8000${props.product.images[0].image}`} alt="Product Image" className="product-image" />
    ) : null;

    return (
        <li className="product-item">
            {firstImage}
            <div className="product-details">
                <h2 className="product-name">{props.product.name}</h2>
            </div>
            <ul className='characteristics'>
                {characteristics[typeOfProduct].map((c, index) => <li key={index}>{c}</li>)}
            </ul>
            <span className="product-price"><p>$ {props.product.price}</p></span>
            <Link to={`/products/${props.product.type}/${props.product._id}`} className="details-link">Details</Link>
        </li>
    );
}

export default Product;
