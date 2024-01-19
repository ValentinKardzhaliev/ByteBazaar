import { createContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/productService.jsx";

const ProductContext = createContext();

export default ProductContext;

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);

    useEffect(() => {
        getAllProducts()
            .then(data => {
                setProducts(data.products);
                setCurrentProducts(data.products.slice(0, 3))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <ProductContext.Provider value={{
            products,
            currentProducts,
            setCurrentProducts
        }}
        >
            {children}
        </ProductContext.Provider>
    )

}