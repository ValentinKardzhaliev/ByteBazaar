import './Product.css'

import { Link } from 'react-router-dom';

function Product(props) {

    return (
        <li key={props.product.id} className="product-item">
            <img src={`http://localhost:8000${props.product.image}`} alt={props.product.name} className="product-image" />
            <div className="product-details">
                <h2 className="product-name">{props.product.name}</h2>
                <h2>${props.product.price}</h2>
                <span className="product-description"><p> - {props.product.description}</p></span>
            </div>
            <Link to={`/details/${props.product.id}`} className="details-link">Details</Link>
        </li>
    )
}

export default Product;