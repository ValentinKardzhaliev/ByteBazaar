import { useContext, useEffect, useState } from 'react';
import { characteristicsLogic } from '../../../utils/characteristicsLogic';
import { likeProduct } from '../../../services/likeService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import './Product.css';
import { Link } from 'react-router-dom';

function Product(props) {
    const [characteristics, setCharacteristics] = useState({});
    let typeOfProduct = props.product.type;
    if (props.user.token) {
        props.likedProducts.some((likedProduct) => likedProduct._id === props.product._id
            ? props.product.isLiked = true : props.product.isLiked = false);
    } else {
        props.product.isLiked = false;
    }

    if (props.likedProducts) {
        props.likedProducts.map((likedProduct) => likedProduct.isLiked = false);
    }
    useEffect(() => {
        setCharacteristics(characteristicsLogic(props.product))

    }, [])

    const firstImage = props.product.images.length > 0 ? (
        <img src={`https://bytebazaar.pythonanywhere.com/${props.product.images[0].image}`} alt="Product Image" className="product-image" />
    ) : null;
    const roundedProductPrice = Math.round(props.product.price);

    return (
        <li className="product-item">
            {firstImage}
            <div className="product-details">
                <p className="product-name">{props.product.name}</p>
                <ul className="characteristics">
                    {Array.isArray(characteristics[typeOfProduct]) && characteristics[typeOfProduct].map((c, index) => (
                        <li key={index}>{c}</li>
                    ))}
                </ul>
            </div>
            <span className="product-price"><p>{roundedProductPrice}$</p></span>
            <div className="details-link-wrapper">
                <div className="details-link-container">
                    <Link to={`/products/${props.product.type}/${props.product._id}`} className="details-link">Details</Link>
                </div>
                <div className="details-link-container-like">
                    <Link onClick={(e) => props.handleLike(e, props.product)}>
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={`like-button ${props.product.isLiked ? "liked" : ""}`}
                        />
                    </Link>
                </div>
            </div>
        </li>
    );
}

export default Product;