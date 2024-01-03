import { useEffect, useState } from "react";
import { getProductByTypeAndId } from "../../services/productService";
import { useParams } from "react-router-dom";
import './ProductDetails.css'

function ProductDetails() {
    const { typeOfProduct, productId } = useParams();
    const [product, setProduct] = useState({})

    useEffect(() => {
        getProductByTypeAndId(typeOfProduct, productId)
            .then(result => {
                setProduct(result);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <h1>Details</h1>
    )
}

export default ProductDetails;