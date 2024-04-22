import React, { useContext, useEffect, useState } from 'react';
import './CheckoutPage.css';
import { getUserCart, getGuestCart } from '../../services/cartService';
import AuthContext from '../../contexts/AuthContext';

function CheckoutPage() {
    const { user } = useContext(AuthContext);
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentInfo, setPaymentInfo] = useState('');
    const [cartId, setCartId] = useState(null); 

    const submitOrder = () => {
        if (!shippingAddress || !paymentInfo || !cartId) {
            alert('Please fill in all required fields');
            return;
        }

        const data = {
            cart: cartId,
            shipping_address: shippingAddress,
            payment_info: paymentInfo
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch('https://bytebazaar.pythonanywhere.com/api/cart/order/', options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to submit order');
                }
            })
            .then(data => {
                console.log('Order submitted successfully:', data);
            })
            .catch(error => {
                console.error('Error submitting order:', error);
            });
    };

    useEffect(() => {
        if (user && user.token) {
            getUserCart(user.token)
                .then(data => {
                    setCartId(data.id);
                })
                .catch(error => console.error('Error fetching user cart:', error));
        } else {
            getGuestCart()
                .then(data => {
                    setCartId(data.id);
                })
                .catch(error => console.error('Error fetching guest cart:', error));
        }
    }, [user]);

    const handleSubmit = (event) => {
        event.preventDefault();
        submitOrder();
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div className="checkout-form-group">
                    <label htmlFor="shippingAddress">Shipping Address:</label>
                    <input
                        type="text"
                        id="shippingAddress"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="checkout-form-group">
                    <label htmlFor="paymentInfo">Payment Information:</label>
                    <input
                        type="text"
                        id="paymentInfo"
                        value={paymentInfo}
                        onChange={(e) => setPaymentInfo(e.target.value)}
                        required
                    />
                </div>
                <button type="checkout-submit">Submit Order</button>
            </form>
        </div>
    );
}

export default CheckoutPage;
