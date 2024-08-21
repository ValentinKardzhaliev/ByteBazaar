import React from 'react';

import image2 from '../../assets/images/underImage.jpg';

function HomePageUnderImage() {
    return (
        <div className="first-image-container">
            <img
                src={image2}
                alt="home-page"
                className='home-page-first-image'
            />
        </div>
    );
}

export default HomePageUnderImage;