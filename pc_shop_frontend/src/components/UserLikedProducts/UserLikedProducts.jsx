import React, { useEffect, useState, useContext } from "react";
import { getAllLikedForUser } from "../../services/productService";
import { Link } from "react-router-dom";
import "./UserLikedProducts.css"; // Define your CSS styles for responsiveness here
import AuthContext from "../../contexts/AuthContext";

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

    return (
        <div className="user-liked-products-container">
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
                                <Link to={`/product/${product._id}`} className="productliked-name">{product.name}</Link>
                                <button className="add-to-cart-button">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserLikedProducts;