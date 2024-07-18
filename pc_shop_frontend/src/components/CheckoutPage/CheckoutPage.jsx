import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import './CheckoutPage.css';
import { getUserCart, getGuestCart } from '../../services/cartService';
import AuthContext from '../../contexts/AuthContext';

const PAYMENT_METHODS = [
    { value: 'CREDIT', label: 'Credit Card' },
    { value: 'PAYPAL', label: 'PayPal' },
    { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
    { value: 'CASH', label: 'Cash' },
    { value: 'DEBIT', label: 'Debit Card' }
];

function CheckoutPage() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cartId, setCartId] = useState(null);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');

    useEffect(() => {
        fetch('https://bytebazaar.pythonanywhere.com/get_countries/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch countries');
                }
                return response.json();
            })
            .then(data => {
                setCountries(data.countries);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });

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
        // Validate all required fields
        if (!shippingAddress || !paymentMethod || !cartId || !selectedCountry || !name || !surname || !city || !postCode) {
            alert('Please fill in all required fields');
            return;
        }

        const data = {
            cart: cartId,
            shipping_address: shippingAddress,
            payment_method: paymentMethod,
            name: name,
            surname: surname,
            phone: phoneNumber,
            country: selectedCountry,
            city: city,
            post_code: postCode
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
                navigate('/');
            })
            .catch(error => {
                console.error('Error submitting order:', error);
            });
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-groups-container">
                    <div className="first-checkout-group">
                        <div className="checkout-form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="checkout-form-group">
                            <label htmlFor="surname">Surname:</label>
                            <input
                                type="text"
                                id="surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="checkout-form-group phone-input-container">
                            <label htmlFor="phone" className="phone-label">Phone:</label>
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                                defaultCountry="US"
                                autoComplete="tel"
                            />
                        </div>
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
                    </div>
                    <div className="second-checkout-group">
                        <div className="checkout-form-group">
                            <label htmlFor="paymentMethod">Payment Method:</label>
                            <select
                                id="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                required
                            >
                                <option value="">Select Payment Method</option>
                                {PAYMENT_METHODS.map(method => (
                                    <option key={method.value} value={method.value}>{method.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="checkout-form-group">
                            <label htmlFor="country">Country:</label>
                            <select id="country" value={selectedCountry} onChange={handleCountryChange} required>
                                <option value="">(select country)</option>
                                {countries.map(country => (
                                    <option key={country.code} value={country.code}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="checkout-form-group">
                            <label htmlFor="city">City:</label>
                            <input
                                type="text"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="checkout-form-group">
                            <label htmlFor="postCode">Post Code:</label>
                            <input
                                type="text"
                                id="postCode"
                                value={postCode}
                                onChange={(e) => setPostCode(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
                <button type="submit">Submit Order</button>
            </form>
        </div>
    );
}

export default CheckoutPage;