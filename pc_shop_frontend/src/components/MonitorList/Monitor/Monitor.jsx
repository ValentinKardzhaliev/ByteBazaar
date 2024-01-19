import { characteristicsLogic } from '../../../utils/characteristicsLogic';
import './Monitor.css';
import { Link } from 'react-router-dom';

function Monitor(props) {
    let characteristics = characteristicsLogic(props);
    let typeOfProduct = props.product.type;
    // Render only the first image
    const firstImage = props.product.images.length > 0 ? (
        <img src={`http://localhost:8000${props.product.images[0].image}`} alt="Product Image" className="product-image" />
    ) : null;

    return (
        <li className="monitor-item">
            {firstImage}
            <div className="monitor-details">
                <h2 className="monitor-name">{props.product.name}</h2>
            </div>
            <ul className='characteristics'>
                {characteristics[typeOfProduct].map((c, index) => <li key={index}>{c}</li>)}
            </ul>
            <span className="monitor-price"><p>$ {props.product.price}</p></span>
            <Link to={`/products/${props.product.type}/${props.product._id}`} className="monitor-link">Details</Link>
        </li>
    );
}

export default Monitor;
