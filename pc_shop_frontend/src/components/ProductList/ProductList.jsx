import { useContext, useState } from 'react';
import ProductContext from '../../contexts/ProductContext.jsx';
import Product from './Product/Product.jsx';
import './ProductList.css'

function ProductList() {
    const { products, currentProducts, setCurrentProducts } = useContext(ProductContext);
    const [placeOfProduct, setPlaceOfProduct] = useState(0);

    function handleNext() {
        if (products.length >= currentProducts.length) {
            setCurrentProducts(products.slice(placeOfProduct + 1, placeOfProduct + 4));
            setPlaceOfProduct(prev => prev + 1);
        }
    }
    function handlePrev() {
        let index = placeOfProduct - 1;
        setCurrentProducts(products.slice(index, index + 3));
        setPlaceOfProduct(prev => prev - 1);

    }

    return (
        <ul className="product-list">
            {products.length === 0 && <h1>No products found!</h1>}
            {placeOfProduct !== 0 ?
                <i className="fa-solid fa-less-than" onClick={handlePrev}></i>
                : <></>
            }
            {currentProducts &&
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