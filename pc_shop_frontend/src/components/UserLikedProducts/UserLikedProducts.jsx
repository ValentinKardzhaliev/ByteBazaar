import React, { useEffect, useState, useContext } from "react";
import { getAllLikedForUser, likeProduct, addToCart } from "../../services/productService";
import { Link } from "react-router-dom";
import "./UserLikedProducts.css"; // Define your CSS styles for responsiveness here
import AuthContext from "../../contexts/AuthContext";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserLikedProducts = () => {
    const { user } = useContext(AuthContext);
    const [likedProducts, setLikedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch liked products for the user
        getAllLikedForUser(user.token)
            .then((result) => {
                setLikedProducts(result.liked_products);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching liked products:", error);
                setLoading(false);
            });
    }, []);

    const unLikeProduct = (productId) => {
        likeProduct(productId, user.token).then(result => {
            setLikedProducts(prevCartItems => likedProducts.filter(i => i._id !== productId))
        }).catch(err => console.log(err));
    }

    const addProductToCart = (productId) => {
        addToCart(productId, user.token).then(result => {
            alert('You have successfully added a product to your cart!')
            console.log(result);
        }).catch(err => console.log(err))
    }

    return (
        <div className="user-liked-products-container">
            <div className="user-liked-products-content-wrapper">
                <h2>Liked Products</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="user-liked-products">
                        {likedProducts.map((product) => (
                            <div className="product-card" key={product._id}>
                                <Link to={`/product/${product._id}`}>
                                    <img src={`http://localhost:8000${product.images[0].image}`} alt={product.name} className="productliked-image" />
                                </Link>
                                <div className="productliked-details">
                                    <h2 className="productliked-name">{product.name}</h2>
                                    <div className="details-inner-container">
                                        <Link to={`/product/${product._id}`} className="product-detailsPage-link">View Full Characteristics</Link>
                                        <div className="product-price-container">
                                            <span className="label">Price:</span>
                                            <span className="productliked-price">{product.price}$</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="productliked-actions">
                                    <a href="#" className="productliked-unlike" role="button" onClick={() => unLikeProduct(product._id)}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </a>
                                    <button className="productliked-add-to-cart" onClick={() => addProductToCart(product._id)}>
                                        Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserLikedProducts;