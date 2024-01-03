import { useEffect, useState } from "react";
import SearchProduct from "./SearchProduct/SearchProduct";
import { getProductsByCriteria } from "../../services/productService";
import { useParams } from "react-router-dom";

function SearchProductList() {
    const [searchProducts, setSearchProducts] = useState([]);
    const { searchParams } = useParams();

    useEffect(() => {
        getProductsByCriteria(searchParams)
            .then(data => {
                setSearchProducts(data.products);
            })
            .catch(err => console.log(err))

    }, [searchParams])

    return (
        <ul className="product-list">
            {searchProducts.length === 0 && <h1>No products found!</h1>}
            {searchProducts.map(product => <SearchProduct key={product._id} product={product} />)}
        </ul>
    )
}

export default SearchProductList;