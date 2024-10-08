import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faX } from "@fortawesome/free-solid-svg-icons";
import "./UserLikedProducts.css";
import { likeProduct } from "../../services/likeService";
import { addToCart } from "../../services/cartService";
import AuthContext from "../../contexts/AuthContext";
import LikedProductsContext from "../../contexts/LikedProductsContext";
import ProductContext from "../../contexts/ProductContext";

const UserLikedProducts = () => {
    const { user } = useContext(AuthContext);
    const { likedProducts, loading, setLikedProducts } = useContext(LikedProductsContext);
    const { products } = useContext(ProductContext);

    if (likedProducts.length === 0) {
        products.map((likedProduct) => likedProduct.isLiked = false);
    }
    const unLikeProduct = (productId) => {
        likeProduct(productId, user.token).then(result => {
            setLikedProducts(() => likedProducts.filter(i => i._id !== productId))
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
                        {likedProducts.length == 0 ? (<p>No liked products</p>) : likedProducts.map((product) => (
                            <div className="product-card" key={product._id}>
                                <Link to={`/products/${product.type}/${product._id}`}>
                                    <img src={`https://bytebazaar.pythonanywhere.com/${product.images[0].image}`} alt={product.name} className="productliked-image" />
                                </Link>
                                <div className="productliked-details">
                                    <h2 className="productliked-name">{product.name}</h2>
                                    <div className="details-inner-container">
                                        <Link to={`/products/${product.type}/${product._id}`} className="product-detailsPage-link">View Full Characteristics</Link>
                                        <div className="product-price-container">
                                            <span className="label">Price:</span>
                                            <span className="productliked-price">{product.price}$</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="productliked-actions">
                                    <a href="#" className="productliked-unlike" role="button" onClick={() => unLikeProduct(product._id)}>
                                        <FontAwesomeIcon icon={faX} />
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