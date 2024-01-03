import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

<<<<<<< HEAD
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
=======
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function Product(props) {
    let characteristics = {
        computer: [],
        monitor: [],
        keyboard: []
    };
    let typeOfProduct = props.product.type;

    switch (typeOfProduct) {
        case 'computer':
            characteristics[typeOfProduct].push(
                props.product.processor,
                props.product.graphics,
                props.product.memory,
                props.product.storage
            );

            break;
        case 'monitor':
            characteristics[typeOfProduct].push(
                props.product.resolution,
                props.product.size
              );

            break;
        case 'keyboard':
            characteristics[typeOfProduct].push(
                capitalizeFirstLetter(props.product.key_switch_type),
                props.product.backlight ? 'Backlit' : 'Not Backlit', // Display a message based on the boolean value
                props.product.color
              );
            break;

        default:
            break;
    }
    return (
        <li className="product-item">
            <img src={`http://localhost:8000${props.product.image}`} alt={props.product.name} className="product-image" />
            <div className="product-details">
                <h2 className="product-name">{props.product.name}</h2>
            </div>
            <ul className='characteristics'>
                {characteristics[typeOfProduct].map((c, index) => <li key={index}>{c}</li>)}
            </ul>

            <span className="product-price"><p>$ {props.product.price}</p></span>
            <Link to={`/products/${props.product.type}/${props.product._id}`} className="details-link">Details</Link>
        </li>
    )
>>>>>>> main
}

export default Product;
