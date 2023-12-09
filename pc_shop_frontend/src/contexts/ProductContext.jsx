import { createContext, useEffect, useState } from "react";
import { getAllProducts, getProductsByCriteria } from "../services/productService.jsx";

const ProductContext = createContext();

export default ProductContext;

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    function setOptionForProducts(searchingOption) {
        getProductsByCriteria(searchingOption)
            .then(data => {
                setProducts(data.products);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllProducts()
            .then(data => {
                setProducts(data.products);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <ProductContext.Provider value={{
            products,
            setOptionForProducts
        }}
        >
            {children}
        </ProductContext.Provider>
    )

}