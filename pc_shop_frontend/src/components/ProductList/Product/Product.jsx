import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

function Product(props) {
  const renderProductDetails = () => {
    const { product } = props;

    if (product.processor) {
      return (
        <div className="product-details">
          <h2 className="product-name">{props.product.name}</h2>
          <p>Processor: {props.product.processor}</p>
          <p>Memory: {props.product.memory}</p>
          <p>Storage: {props.product.storage}</p>
        </div>
      );
    } else if (product.resolution) {
      return (
        <div className="product-details">
          <h2 className="product-name">{props.product.name}</h2>
          <p>Resolution: {props.product.resolution}</p>
          <p>Size: {props.product.size}</p>
        </div>
      );
    } else if (product.key_switch_type) {
      return (
        <div className="product-details">
          <h2 className="product-name">{props.product.name}</h2>
          <p>Key Switch Type: {props.product.key_switch_type}</p>
          <p>Backlight: {props.product.backlight ? 'Yes' : 'No'}</p>
          <p>Wireless: {props.product.wireless ? 'Yes' : 'No'}</p>
        </div>
      );
    } else {
      // Default rendering for other product types
      return (
        <div className="product-details">
          <h2 className="product-name">{props.product.name}</h2>
          <span className="product-description">
            <p>{props.product.description}</p>
          </span>
        </div>
      );
    }
  };

  return (
    <li key={props.product.id} className="product-item">
      <img src={`http://localhost:8000${props.product.image}`} alt={props.product.name} className="product-image" />
      {renderProductDetails()}
      <Link to={`/details/${props.product.id}`} className="details-link">
        Details
      </Link>
    </li>
  );
}

export default Product;
