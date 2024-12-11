import { useContext, useEffect, useState } from "react";
import './HomePage.css';
import ProductList from "../ProductList/ProductList";
import AuthContext from "../../contexts/AuthContext";
import LikedProductsContext from "../../contexts/LikedProductsContext";
import ProductContext from "../../contexts/ProductContext";

import imageUnder from '../../assets/images/underImage.jpg';

import pairPhoto from '../../assets/images/pair.jpg';
import pair2Photo from '../../assets/images/pair2.webp';
import HomePageImage from "../HomePageImage/HomePageImage";
import { getAllLikedProductsForUser } from "../../services/likeService";

function HomePage() {
    const { user } = useContext(AuthContext);
    const { products, currentProducts, otherProducts, isLoading } = useContext(ProductContext);
    const { likedProducts, handleLike } = useContext(LikedProductsContext);

    useEffect(() => {
        getAllLikedProductsForUser(user?.token)
            .then((result) => {
                setLikedProducts(result.liked_products);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching liked products:", error);
                setLoading(false);
            });

    }, []);

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
            <div className="under-image-container">
                <img
                    src={imageUnder}
                    alt="home-page"
                    className='home-page-under-image'
                />
            </div>
            <ProductList
                user={user}
                products={products}
                currentProducts={otherProducts}
                isLoading={isLoading}
                likedProducts={likedProducts}
                handleLike={handleLike}
            />

            <div className="image-inline-container">
                <img src={pairPhoto} alt='homePageImage' className="image-inline" />
                <img src={pair2Photo} alt='homePageImage' className="image-inline" />
            </div>

        </>
    )
}

export default HomePage;