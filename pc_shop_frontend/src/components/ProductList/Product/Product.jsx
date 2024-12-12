import { useEffect, useState } from 'react';
import { characteristicsLogic } from '../../../utils/characteristicsLogic';
import './Product.css';
import { Link } from 'react-router-dom';

function Product({ product, likedProducts, handleLike }) {
    const [characteristics, setCharacteristics] = useState({});
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setIsLiked(likedProducts.some(likedProduct => likedProduct._id === product._id));
        setCharacteristics(characteristicsLogic(product));
    }, [likedProducts, product]);

    const firstImage = product?.images?.length > 0 ? (
        <img
            src={`https://bytebazaar.pythonanywhere.com/${product.images[0].image}`}
            alt="Product Image"
            className="product-image"
        />
    ) : null;

    const roundedProductPrice = Math.round(product.price);

    return (
        <li className="product-item">
            {firstImage}
            <div className="product-details">
                <p className="product-name">{product.name}</p>
                <ul className="characteristics">
                    {Array.isArray(characteristics[product.type]) &&
                        characteristics[product.type].map((c, index) => (
                            <li key={index}>{c}</li>
                        ))}
                </ul>
            </div>
            <span className="product-price">
                <p>{roundedProductPrice}$</p>
            </span>
            <div className="details-link-wrapper">
                <div className="details-link-container">
                    <Link to={`/products/${product.type}/${product._id}`} className="details-link">
                        Details
                    </Link>
                </div>
                <div className="details-link-container-like">
                    {isLiked ? (
                        <svg
                            className="heart-margin-productlist"
                            onClick={(e) => { handleLike(e, product); setIsLiked(false) }}
                            width="48"
                            height="43"
                            viewBox="0 0 48 43"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M41.9009 4.39226L41.9001 4.39152C36.7304 -0.0439594 29.1466 0.823796 24.5366 5.61214C24.5365 5.61227 24.5364 5.6124 24.5362 5.61253C24.5361 5.61264 24.536 5.61274 24.5359 5.61285L24.0006 6.16823L23.4663 5.61392C23.4659 5.61354 23.4656 5.61315 23.4652 5.61276C18.8624 0.822867 11.27 -0.043313 6.10114 4.39152L6.10027 4.39226C0.285379 9.38906 -0.0131035 18.3297 5.18412 23.7392L5.18475 23.7398L21.0575 40.2408L21.0578 40.2411C22.6732 41.9196 25.3198 41.9196 26.9352 40.2411L26.9355 40.2408L42.808 23.7401C42.8081 23.74 42.8082 23.7399 42.8083 23.7398C48.0145 18.3302 47.7159 9.38909 41.9009 4.39226Z"
                                fill="#C00000"
                                stroke="#C00000"
                                strokeWidth={2}
                            />
                        </svg>
                    ) : (
                        <svg
                            className="heart-margin-productlist"
                            onClick={(e) => { handleLike(e, product); setIsLiked(true) }}
                            width="48"
                            height="43"
                            viewBox="0 0 48 43"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M41.9009 4.39226L41.9001 4.39152C36.7304 -0.0439594 29.1466 0.823796 24.5366 5.61214C24.5365 5.61227 24.5364 5.6124 24.5362 5.61253C24.5361 5.61264 24.536 5.61274 24.5359 5.61285L24.0006 6.16823L23.4663 5.61392C23.4659 5.61354 23.4656 5.61315 23.4652 5.61276C18.8624 0.822867 11.27 -0.043313 6.10114 4.39152L6.10027 4.39226C0.285379 9.38906 -0.0131035 18.3297 5.18412 23.7392L5.18475 23.7398L21.0575 40.2408L21.0578 40.2411C22.6732 41.9196 25.3198 41.9196 26.9352 40.2411L26.9355 40.2408L42.808 23.7401C42.8081 23.74 42.8082 23.7399 42.8083 23.7398C48.0145 18.3302 47.7159 9.38909 41.9009 4.39226Z"
                                stroke="#666666"
                                strokeWidth={2}
                            />
                        </svg>
                    )}
                </div>
            </div>
        </li>
    );
}

export default Product;