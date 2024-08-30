import { useContext } from "react";
import HomePageImage from "../HomePageImage/HomePageImage";
import HomePageUnderImage from "../HomePageUnderImage/HomePageUnderImage";
import ProductList from "../ProductList/ProductList";
import AuthContext from "../../contexts/AuthContext";
import LikedProductsContext from "../../contexts/LikedProductsContext";
import ProductContext from "../../contexts/ProductContext";

function HomePage() {
    const { user } = useContext(AuthContext);
    const { products, currentProducts, otherProducts, isLoading } = useContext(ProductContext);
    const { likedProducts, handleLike } = useContext(LikedProductsContext);

    return (
        <>
            <HomePageImage />
            <div className="trending-offers-container">
                <p className='trending-offers'>Trending Offers</p>
            </div>
            <ProductList
                user={user}
                products={products}
                currentProducts={currentProducts}
                isLoading={isLoading}
                likedProducts={likedProducts}
                handleLike={handleLike}
            />
            <HomePageUnderImage />
            <ProductList
                user={user}
                products={products}
                currentProducts={otherProducts}
                isLoading={isLoading}
                likedProducts={likedProducts}
                handleLike={handleLike}
            />
        </>
    )
}

export default HomePage;