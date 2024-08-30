import { useContext, useState } from "react";
import './HomePage.css';
import ProductList from "../ProductList/ProductList";
import AuthContext from "../../contexts/AuthContext";
import LikedProductsContext from "../../contexts/LikedProductsContext";
import ProductContext from "../../contexts/ProductContext";

import image1 from '../../assets/images/image1.webp';
import image2 from '../../assets/images/image2.webp';
import image3 from '../../assets/images/image3.webp';
import image4 from '../../assets/images/image4.webp';

import imageUnder from '../../assets/images/underImage.jpg';

import pairPhoto from '../../assets/images/pair.jpg';
import pair2Photo from '../../assets/images/pair2.webp';

const images = [image1, image2, image3, image4];

function HomePage() {
    const { user } = useContext(AuthContext);
    const { products, currentProducts, otherProducts, isLoading } = useContext(ProductContext);
    const { likedProducts, handleLike } = useContext(LikedProductsContext);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePreviousClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <>
            <div className="first-image-container">
                <button onClick={handlePreviousClick} className="arrow left-arrow">&lt;</button>
                <img
                    src={images[currentImageIndex]}
                    alt="home-page"
                    className='home-page-first-image'
                />
                <button onClick={handleNextClick} className="arrow right-arrow">&gt;</button>
            </div>
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