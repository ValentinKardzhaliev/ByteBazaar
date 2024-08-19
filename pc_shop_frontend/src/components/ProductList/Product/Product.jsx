import { useEffect, useState, useContext } from 'react';
import { characteristicsLogic } from '../../../utils/characteristicsLogic';
import { getAllLikedProductsForUser, likeProduct } from '../../../services/likeService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import AuthContext from '../../../contexts/AuthContext';
import './Product.css';
import { Link } from 'react-router-dom';

function Product(props) {
    const { user } = useContext(AuthContext);
    const [characteristics, setCharacteristics] = useState({});
    const [isLiked, setIsLiked] = useState(false);

    let typeOfProduct = props.product.type;
    //TODO: Make solution to request 1 time liked products in the ProductList component!
    if (user.token) {
        // useEffect(() => {
        //     getAllLikedProductsForUser(user.token).then(likedProduct => {
        //         setIsLiked(likedProduct.liked_products.some((likedProduct) => likedProduct._id === props.product._id));
        //     })
        // }, [])
        console.log("Liked");

    }
    useEffect(() => {
        setCharacteristics(characteristicsLogic(props.product))
    }, [])


    const firstImage = props.product.images.length > 0 ? (
        <img src={`https://bytebazaar.pythonanywhere.com/${props.product.images[0].image}`} alt="Product Image" className="product-image" />
    ) : null;
    const roundedProductPrice = Math.round(props.product.price);

    const handleLike = (e) => {
        e.preventDefault();
        setIsLiked(prevIsLiked => !prevIsLiked)
        likeProduct(props.product._id, user.token).then(result => {
            console.log(result);
        }).catch(err => console.log(err));
    };
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
                    <Link onClick={(e) => handleLike(e)}>
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={`like-button ${isLiked ? "liked" : ""}`}
                        />
                    </Link>
                </div>
            </div>
        </li>
    );
}

export default Product;