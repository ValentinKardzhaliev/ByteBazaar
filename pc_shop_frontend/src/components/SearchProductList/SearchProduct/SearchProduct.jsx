import { Link } from 'react-router-dom';

function SearchProduct(props) {

    return (
        <li key={props.product.id} className="product-item">
            <img src={`http://localhost:8000${props.product.image}`} alt={props.product.name} className="product-image" />
            <div className="product-details">
                <h2 className="product-name">{props.product.name}</h2>
            </div>
            <span className="product-price"><p>$ {props.product.price}</p></span>
            <Link to={`/details/${props.product.id}`} className="details-link">Details</Link>
        </li>
    )
}

export default SearchProduct;