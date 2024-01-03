import { createContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/productService.jsx";

const ProductContext = createContext();

export default ProductContext;

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        getAllProducts()
            .then(data => {
                setProducts(data.results.products);
                setPagination(data);
            })
            .catch(err => console.log(err));
    }, []);

    const loadMoreProducts = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();

            setProducts(prevProducts => [...prevProducts.slice(1), ...data.results.products]);
            setPagination(data);
        } catch (error) {
            console.error('Error loading more products:', error);
        }
    };

    return (
        <ProductContext.Provider value={{ products, pagination, loadMoreProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
