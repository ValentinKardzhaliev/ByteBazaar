import './ProductList.css'
import Product from './Product/Product.jsx';

function ProductList(props) {
    
    return (
        <ul className="product-list">
            {props.isLoading ? <h1>Loading...</h1> : props.products.length === 0 && <h1>No products found!</h1>}
            
            {
                props.currentProducts.map(product => <Product key={product._id}
                    user={props.user}
                    handleLike={props.handleLike}
                    product={product}
                    likedProducts={props.likedProducts} />)}
            {
             
            }
        </ul>
    )
}

export default ProductList;