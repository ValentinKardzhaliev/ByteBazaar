import { useContext } from 'react';
import ProductContext from '../../contexts/ProductContext.jsx';
import Product from './Product/Product.jsx';
import './ProductList.css'

function ProductList() {
    const { products } = useContext(ProductContext);

    return (
        <ul className="product-list">
            {products.length === 0 && <h1>No products found!</h1>}
            {products.map(product => <Product key={product.id} product={product} />)}
        </ul>
    )
}

export default ProductList;