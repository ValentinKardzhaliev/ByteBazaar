import { useContext } from 'react';
import './ProductList.css'
import Product from './Product/Product.jsx';
import ProductContext from '../../contexts/ProductContext.jsx';

function ProductList() {
    const { products, currentProducts, setCurrentProducts, isLoading, placeOfProduct, setPlaceOfProduct } = useContext(ProductContext);

    function handleNext() {
        if (products.length >= currentProducts.length) {
            setCurrentProducts(products.slice(placeOfProduct + 1, placeOfProduct + 5));
            setPlaceOfProduct(prev => prev + 1);
        }
    }
    function handlePrev() {
        let index = placeOfProduct - 1;
        setCurrentProducts(products.slice(index, index + 4));
        setPlaceOfProduct(prev => prev - 1);

    }

    return (
        <ul className="product-list">
            {isLoading ? <h1>Loading...</h1> : products.length === 0 && <h1>No products found!</h1>}
            {placeOfProduct !== 0 ?
                <i className="fa-solid fa-less-than" onClick={handlePrev}></i>
                : <></>
            }
            {
                currentProducts.map(product => <Product key={product._id} product={product} />)}
            {
                currentProducts[currentProducts.length - 1] !== products[products.length - 1] ?
                    <i className="fa-solid fa-greater-than" onClick={handleNext} />
                    : <></>
            }
        </ul>
    )
}

export default ProductList;