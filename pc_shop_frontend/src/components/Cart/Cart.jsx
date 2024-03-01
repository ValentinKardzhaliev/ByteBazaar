import { useContext, useEffect, useState } from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getUserCart, increaseProductQuantity, decreaseProductQuantity, removeProductFromCart } from '../../services/productService';
import AuthContext from '../../contexts/AuthContext';

function Cart() {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        getUserCart(user.token)
            .then(result => {
                setCartItems(result.items);
            })
            .catch(err => console.log(err));
    }, []);

    const increaseQuantity = (productId) => {
        increaseProductQuantity(productId, user.token).then(result => {
            setCartItems(prevCartItems => cartItems.map(i => i.product_id == productId ? { ...i, quantity: i.quantity + 1 } : i));
        }).catch(err => console.log(err));
    }

    const decreaseQuantity = (productId) => {
        decreaseProductQuantity(productId, user.token).then(result => {
            setCartItems(prevCartItems => cartItems.map(i => i.product_id == productId && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i));
        }).catch(err => console.log(err));
    }

    const removeProduct = (productId) => {
        removeProductFromCart(productId, user.token).then(result => {
            setCartItems(prevCartItems => cartItems.filter(i => i.product_id !== productId));
        }).catch(err => console.log(err));
    }
    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty.</p>
            ) : (
                <div className="cart-items-list">
                    {cartItems.map((item) => (
                        <div className="product-card" key={item.product._id}>
                            <img src={`http://localhost:8000${item.product.images[0].image}`} alt={item.product.name} className="cart-product-image" />
                            <div className="cart-item-details">
                                <p className="cart-product-name">Name - {item.product.name}</p>
                                <div className="cart-buttons-container">
                                    <button className="quantity-button decrease" onClick={() => decreaseQuantity(item.product._id)}>-</button>
                                    <span className="cart-product-quantity">{item.quantity}</span>
                                    <button className="quantity-button increase" onClick={() => increaseQuantity(item.product._id)}>+</button>
                                    <span className="cart-product-price">${item.product.price * item.quantity}</span>
                                    <button className="cart-delete-button" onClick={() => removeProduct(item.product._id)}><FontAwesomeIcon icon={faTrash} />Изтрий</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>



            )}
        </div>
    );
}

export default Cart;