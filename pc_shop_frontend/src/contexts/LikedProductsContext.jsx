import { createContext, useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";
import { getAllLikedProductsForUser, likeProduct } from "../services/likeService";
import { useNavigate } from "react-router-dom";

const LikedProductsContext = createContext();

export default LikedProductsContext;

export const LikedProductsProvider = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [likedProducts, setLikedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.token) {
            getAllLikedProductsForUser(user.token)
                .then((result) => {
                    setLikedProducts(result.liked_products);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching liked products:", error);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleLike = (e, product) => {
        e.preventDefault();
        if (user?.token) {
            likeProduct(product._id, user.token)
                .then(() => {
                    const updatedLikedProducts = likedProducts.some(p => p._id === product._id)
                        ? likedProducts.filter(p => p._id !== product._id)
                        : [...likedProducts, product];
                    setLikedProducts(updatedLikedProducts);
                })
                .catch(err => console.error(err));
        } else {
            navigate('/login');
        }
    };

    return (
        <LikedProductsContext.Provider value={{
            likedProducts,
            loading,
            handleLike,
            setLikedProducts
        }}>
            {children}
        </LikedProductsContext.Provider>
    );
};