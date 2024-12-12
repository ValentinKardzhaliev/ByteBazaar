import './ProductList.css';
import Product from './Product/Product.jsx';
import { useEffect, useState } from 'react';
import { getAllLikedProductsForUser } from '../../services/likeService.jsx';

function ProductList(props) {
    const [likedProducts, setLikedProducts] = useState([]);

    useEffect(() => {
        if (props.user?.token) {
            getAllLikedProductsForUser(props.user.token)
                .then((result) => {
                    setLikedProducts(result.liked_products);
                })
                .catch((error) => {
                    console.error("Error fetching liked products:", error);
                });
        }
    }, [props.user]);

    return (
        <ul className="product-list">
            {props.isLoading ? (
                <h1>Loading...</h1>
            ) : props.products.length === 0 ? (
                <h1>No products found!</h1>
            ) : (
                props.currentProducts.map(product => (
                    <Product
                        key={product._id}
                        user={props.user}
                        handleLike={props.handleLike}
                        product={product}
                        likedProducts={likedProducts}
                        setLikedProducts={setLikedProducts}
                    />
                ))
            )}
        </ul>
    );
}

export default ProductList;