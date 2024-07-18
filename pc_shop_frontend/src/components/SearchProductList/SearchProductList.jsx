import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCriteria } from "../../services/productService";
import SearchProduct from "./SearchProduct/SearchProduct";
import LoadingContext from "../../contexts/LoadingContext";

function SearchProductList() {
    const [searchProducts, setSearchProducts] = useState([]);
    const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);
    const { searchParams } = useParams();

    useEffect(() => {
        startLoading();
        getProductsByCriteria(searchParams)
            .then(data => {
                setSearchProducts(data.products);
                stopLoading();
            })
            .catch(err => console.log(err))

    }, [searchParams])

    return (
        <ul className="product-list">
            {isLoading ? <h1>Loading...</h1> : searchProducts.length === 0 && <h1>No products found!</h1>}
            {searchProducts.map(product => <SearchProduct key={product._id} product={product} />)}
        </ul>
    )
}

export default SearchProductList;