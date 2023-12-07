import Product from './Product/Product';
import './ProductList.css'

function ProductList(props) {

    return (
        <ul className="product-list">
            {props.products.map(product => <Product key={product._id} product={product} />)}
        </ul>
    )
}

export default ProductList;