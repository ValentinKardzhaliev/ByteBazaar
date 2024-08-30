import React from 'react';
import './NotFoundPage.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

import notFoundImage from '../../assets/images/notFound.webp'; // Replace with your image path

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <img src={notFoundImage} alt="Not Found" className="not-found-image" />
      <p className="not-found-message">Sorry, the page you are looking for does not exist. <Link to={'/'}>Go to home page</Link></p>
    </div>
  );
};

export default NotFoundPage;