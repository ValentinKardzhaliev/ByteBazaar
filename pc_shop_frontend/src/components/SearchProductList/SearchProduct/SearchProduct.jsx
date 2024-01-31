import { Link } from 'react-router-dom';
import { characteristicsLogic } from '../../../utils/characteristicsLogic';

function SearchProduct(props) {
    const characteristics = characteristicsLogic(props);
    let typeOfProduct = props.product.type;

    return (
        <li className="product-item">
            <img src={`http://localhost:8000/${props.product.images[0].image}`} alt={props.product.name} className="product-image" />
            <div className="product-details">
                <h2 className="product-name">{props.product.name}</h2>
            </div>

            <ul className='characteristics'>
                {characteristics[typeOfProduct].map((c, index) => <li key={index}>{c}</li>)}
            </ul>
            <span className="product-price"><p>$ {props.product.price}</p></span>
            <Link to={`/products/${props.product.type}/${props.product._id}`} className="details-link">Details</Link>
        </li>
    )
}

export default SearchProduct;