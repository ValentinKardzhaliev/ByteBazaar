import React from 'react';
import './HomePageUnderImage.css';

import image2 from '../../assets/images/underImage.jpg';

function HomePageUnderImage() {
    return (
        <div className="under-image-container">
            <img
                src={image2}
                alt="home-page"
                className='home-page-under-image'
            />
        </div>
    );
}

export default HomePageUnderImage;