import Product from './Product/Product';
import './ProductList.css'

function ProductList(props) {

    return (
        <ul className="product-list">
            {props.products.length === 0 && <h1>No products found!</h1>}
            {props.products.map(product => <Product key={product.id} product={product} />)}
        </ul>
    )
}

export default ProductList;