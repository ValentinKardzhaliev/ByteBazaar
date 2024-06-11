import React, { useState } from 'react';
import './HomePageImage.css';

import image1 from '../../assets/images/asustufpromo-ecoms.webp';
import image2 from '../../assets/images/msi-promo-ecom-main.webp';

const images = [image1, image2];  // Add all images to this array

function HomePageImage() {
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
        <div className="first-image-container">
            <button onClick={handlePreviousClick} className="arrow left-arrow">&lt;</button>
            <img 
                src={images[currentImageIndex]} 
                alt="home-page" 
                className='home-page-first-image'
            />
            <button onClick={handleNextClick} className="arrow right-arrow">&gt;</button>
        </div>
    );
}

export default HomePageImage;
