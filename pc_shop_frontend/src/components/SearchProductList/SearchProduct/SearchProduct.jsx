import { Link } from 'react-router-dom';
import { characteristicsLogic } from '../../../utils/characteristicsLogic';
import { useEffect, useState } from 'react';

function SearchProduct(props) {
    const [characteristics, setCharacteristics] = useState({});
    let typeOfProduct = props.product.type;

    useEffect(() => { setCharacteristics(characteristicsLogic(props.product)) }, [])
    return (
        <li className="product-item">
            <img src={`https://bytebazaar.pythonanywhere.com/${props.product.images[0].image}`} alt={props.product.name} className="product-image" />
            <div className="product-details">
                <h2 className="product-name">{props.product.name}</h2>
            </div>

            <ul className='characteristics'>
                {Array.isArray(characteristics[typeOfProduct]) && characteristics[typeOfProduct].map((c, index) => (
                    <li key={index}>{c}</li>
                ))}
            </ul>
            <span className="product-price"><p>$ {props.product.price}</p></span>
            <Link to={`/products/${props.product.type}/${props.product._id}`} className="details-link">Details</Link>
        </li>
    )
}

export default SearchProduct;