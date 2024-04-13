import { characteristicsLogic } from '../../../utils/characteristicsLogic';
import './Product.css';
import { Link } from 'react-router-dom';

function Product(props) {
    let characteristics = characteristicsLogic(props);
    let typeOfProduct = props.product.type;
    // Render only the first image
    const firstImage = props.product.images.length > 0 ? (
        <img src={`https://bytebazaar.pythonanywhere.com/${props.product.images[0].image}`} alt="Product Image" className="product-image" />
    ) : null;
    const roundedProductPrice = Math.round(props.product.price)

    return (
        <li className="product-item">
            {firstImage}
            <div className="product-details">
                <p className="product-name">{props.product.name}</p>
                <ul className="characteristics">
                    {characteristics[typeOfProduct].map((c, index) => <li key={index}>{c}</li>)}
                </ul>
            </div>
            <span className="product-price"><p>{roundedProductPrice}$</p></span>
            <div className="details-link-container">
                <Link to={`/products/${props.product.type}/${props.product._id}`} className="details-link">Details</Link>
            </div>
        </li>
    );
}

export default Product;
