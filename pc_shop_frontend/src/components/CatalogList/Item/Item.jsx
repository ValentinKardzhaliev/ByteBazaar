import { characteristicsLogic } from '../../../utils/characteristicsLogic';
import './Item.css';
import { Link } from 'react-router-dom';

function Item(props) {
    let characteristics = characteristicsLogic(props);
    let typeOfProduct = props.product.type;
    // Render only the first image
    const firstImage = props.product.images.length > 0 ? (
        <img src={`http://localhost:8000${props.product.images[0].image}`} alt="Product Image" className="item-image" />
    ) : null;

    return (
        <li className="item">
            {firstImage}
            <div className="item-details">
                <h2 className="item-name">{props.product.name}</h2>
                <ul className='characteristics'>
                    {characteristics[typeOfProduct].map((c, index) => <li key={index}>{c}</li>)}
                </ul>
            </div>

            <span className="item-price"><p>$ {props.product.price}</p></span>
            <Link to={`/products/${props.product.type}/${props.product._id}`} className="item-details-link">Details</Link>
        </li>
    );
}

export default Item;