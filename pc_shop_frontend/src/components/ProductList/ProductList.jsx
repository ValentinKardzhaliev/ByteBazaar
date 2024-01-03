import React, { useContext } from 'react';
import ProductContext from '../../contexts/ProductContext';
import Product from './Product/Product';
import './ProductList.css';

function ProductList() {
    const { products, pagination, loadMoreProducts } = useContext(ProductContext);

    if (!products.length) {
        return <h1>No products found!</h1>;
    }

    return (
        <div className="product-list-container">
            <ul className="product-list">
                {products.map(product => <Product key={product._id} product={product} />)}
            </ul>
            {pagination && pagination.next && (
                <button className="load-more-button" onClick={() => loadMoreProducts(pagination.next)}>
                    ➡️ Load More
                </button>
            )}
        </div>
    );
}

export default ProductList;
