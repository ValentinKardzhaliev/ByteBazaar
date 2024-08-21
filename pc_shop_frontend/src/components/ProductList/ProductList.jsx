import { useContext } from 'react';
import './ProductList.css'
import Product from './Product/Product.jsx';
import ProductContext from '../../contexts/ProductContext.jsx';
import AuthContext from '../../contexts/AuthContext.jsx';
import LikedProductsContext from '../../contexts/LikedProductsContext.jsx';

function ProductList() {
    const { user } = useContext(AuthContext);
    const { products, currentProducts, setCurrentProducts, isLoading, placeOfProduct, setPlaceOfProduct } = useContext(ProductContext);
    const { likedProducts, handleLike } = useContext(LikedProductsContext);

    function handleNext() {
        if (products.length >= currentProducts.length) {
            setCurrentProducts(products.slice(placeOfProduct + 1, placeOfProduct + 6));
            setPlaceOfProduct(prev => prev + 1);
        }
    }
    function handlePrev() {
        let index = placeOfProduct - 1;
        setCurrentProducts(products.slice(index, index + 5));
        setPlaceOfProduct(prev => prev - 1);

    }

    return (
        <ul className="product-list">
            {isLoading ? <h1>Loading...</h1> : products.length === 0 && <h1>No products found!</h1>}
            
            {
                currentProducts.map(product => <Product key={product._id}
                    user={user}
                    handleLike={handleLike}
                    product={product}
                    likedProducts={likedProducts} />)}
            {
             
            }
        </ul>
    )
}

export default ProductList;