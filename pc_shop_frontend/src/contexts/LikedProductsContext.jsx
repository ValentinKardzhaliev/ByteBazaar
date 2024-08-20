import { createContext, useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";
import { getAllLikedProductsForUser } from "../services/likeService"
import { likeProduct } from '../services/likeService'
import { useNavigate } from "react-router-dom";

const LikedProductsContext = createContext();

export default LikedProductsContext;

export const LikedProductsProvider = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [likedProducts, setLikedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllLikedProductsForUser(user.token)
            .then((result) => {
                setLikedProducts(result.liked_products);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching liked products:", error);
                setLoading(false);
            });
    }, []);

    const handleLike = (e, product) => {
        e.preventDefault();
        if (user.token) {
            likeProduct(product._id, user.token).then(result => {
                console.log(result);
                product.isLiked = !product.isLiked;
                getAllLikedProductsForUser(user.token).then(likedProduct => {
                    setLikedProducts(likedProduct.liked_products);
                })
            }).catch(err => console.log(err));
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
        }}
        >
            {children}
        </LikedProductsContext.Provider>
    )

}