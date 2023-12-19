import './Product.css'

import { Link } from 'react-router-dom';

function Product(props) {
    let characteristics = {
        computer: [],
        monitor: [],
        keyboard: []
    };
    let typeOfProduct = props.product.type;

    switch (typeOfProduct) {
        case 'computer':
            characteristics[typeOfProduct].push(
                props.product.processor,
                props.product.graphics,
                props.product.memory,
                props.product.storage
            )

            break;
        case 'monitor':

            break;
        case 'keyboard':

            break;

        default:
            break;
    }
    return (
        <li className="product-item">
            <img src={`http://localhost:8000${props.product.image}`} alt={props.product.name} className="product-image" />
            <div className="product-details">
                <h2 className="product-name">{props.product.name}</h2>
            </div>
            <ul className='characteristics'>
                {characteristics[typeOfProduct].map(c => <li key={c}>{c}</li>)}
            </ul>



            <span className="product-price"><p>$ {props.product.price}</p></span>
            <Link to={`/products/${props.product.type}/${props.product._id}`} className="details-link">Details</Link>
        </li>
    )
}

export default Product;