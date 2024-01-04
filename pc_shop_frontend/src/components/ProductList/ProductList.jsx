import React, { useContext } from 'react';
import ProductContext from '../../contexts/ProductContext';
import Product from './Product/Product';
import './ProductList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';

function ProductList() {
    const { products, pagination, loadMoreProducts } = useContext(ProductContext);

    if (!products.length) {
        return <h1>No products found!</h1>;
    }

    return (
        <div className="product-list-container">
            <ul className="product-list">
                {products.slice(0, 4).map(product => <Product key={product._id} product={product} />)}
            </ul>
            <ul className="product-list">
                {products.slice(4).map(product => <Product key={product._id} product={product} />)}
            </ul>
            {pagination && pagination.next && (
                <div className="load-more-button" onClick={() => loadMoreProducts(pagination.next)}>
                    <FontAwesomeIcon icon={faGreaterThan} />
                </div>
            )}
        </div>
    );
}

export default ProductList;
