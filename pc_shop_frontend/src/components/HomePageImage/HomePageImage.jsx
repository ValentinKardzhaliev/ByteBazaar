import React, { useState } from 'react';
import './HomePageImage.css';

import image1 from '../../assets/images/image1.webp';
import image2 from '../../assets/images/image2.webp';
import image3 from '../../assets/images/image3.webp';
import image4 from '../../assets/images/image4.webp';

const images = [image1, image2, image3, image4];  // Add all images to this array

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
