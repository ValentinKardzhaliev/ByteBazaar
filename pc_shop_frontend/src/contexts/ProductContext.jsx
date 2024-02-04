import { createContext, useEffect, useState, useContext } from "react";
import { getAllProducts } from "../services/productService.jsx";
import LoadingContext from "./LoadingContext.jsx";

const ProductContext = createContext();

export default ProductContext;

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [placeOfProduct, setPlaceOfProduct] = useState(0);

    const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);

    useEffect(() => {
        startLoading()
        getAllProducts()
            .then(data => {

                setProducts(data.products);
                setCurrentProducts(data.products.slice(0, 4));

                stopLoading();
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <ProductContext.Provider value={{
            products,
            currentProducts,
            setCurrentProducts,
            isLoading,
            placeOfProduct,
            setPlaceOfProduct
        }}
        >
            {children}
        </ProductContext.Provider>
    )

}