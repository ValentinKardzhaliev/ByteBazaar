import { createContext, useEffect, useState, useContext } from "react";
import { getAllProducts } from "../services/productService.jsx";
import LoadingContext from "./LoadingContext.jsx";

const ProductContext = createContext();

export default ProductContext;

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [otherProducts, setOtherProducts] = useState([]);

    const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);

    useEffect(() => {
        startLoading()
        getAllProducts()
            .then(data => {
                setProducts(data.products);
                setCurrentProducts(data.products.slice(0, 5));
                setOtherProducts(data.products.slice(5, 10))
                stopLoading();
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <ProductContext.Provider value={{
            products,
            currentProducts,
            otherProducts,
            setCurrentProducts,
            isLoading,
        }}
        >
            {children}
        </ProductContext.Provider>
    )

}