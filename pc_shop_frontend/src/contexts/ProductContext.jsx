import { createContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/productService.jsx";

const ProductContext = createContext();

export default ProductContext;

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

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
        }}
        >
            {children}
        </ProductContext.Provider>
    )

}