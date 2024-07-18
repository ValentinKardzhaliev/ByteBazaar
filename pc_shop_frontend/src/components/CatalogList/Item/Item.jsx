import { useEffect, useState } from 'react';
import { characteristicsLogic } from '../../../utils/characteristicsLogic';
import './Item.css';
import { Link } from 'react-router-dom';

function Item(props) {
    const [characteristics, setCharacteristics] = useState({});
    let typeOfProduct = props.product.type;
    useEffect(() => { setCharacteristics(characteristicsLogic(props.product)) }, []);

    const firstImage = props.product.images.length > 0 ? (
        <img src={`https://bytebazaar.pythonanywhere.com/${props.product.images[0].image}`} alt="Product Image" className="item-image" />
    ) : null;

    return (
        <li className="item">
            {firstImage}
            <div className="item-details">
                <h2 className="item-name">{props.product.name}</h2>
                <ul className='item-characteristics'>
                    {Array.isArray(characteristics[typeOfProduct]) && characteristics[typeOfProduct].map((c, index) => (
                        <li key={index}>{c}</li>
                    ))}
                </ul>
            </div>

            <span className="item-price"><p>$ {props.product.price}</p></span>
            <div className="item-details-link-container">
                <Link to={`/products/${props.product.type}/${props.product._id}`} className="item-details-link">Details</Link>
            </div>
        </li>
    );
}

export default Item;