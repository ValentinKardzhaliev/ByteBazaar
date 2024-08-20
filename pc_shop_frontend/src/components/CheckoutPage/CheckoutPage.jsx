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

const CheckoutPage = () => {
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
        fetchCountries();
        fetchCart();
    }, [user]);

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://bytebazaar.pythonanywhere.com/get_countries/');
            if (!response.ok) throw new Error('Failed to fetch countries');
            const data = await response.json();
            setCountries(data.countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const fetchCart = async () => {
        try {
            const cartData = user && user.token ? await getUserCart(user.token) : await getGuestCart();
            setCartId(cartData.id);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isValidForm()) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const response = await submitOrder();
            if (response.ok) {
                const data = await response.json();
                console.log('Order submitted successfully:', data);
                navigate('/');
            } else {
                throw new Error('Failed to submit order');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    const isValidForm = () => (
        shippingAddress && paymentMethod && cartId && selectedCountry && name && surname && city && postCode
    );

    const submitOrder = () => {
        const data = {
            cart: cartId,
            shipping_address: shippingAddress,
            payment_method: paymentMethod,
            name,
            surname,
            phone: phoneNumber,
            country: selectedCountry,
            city,
            post_code: postCode
        };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return fetch('https://bytebazaar.pythonanywhere.com/api/cart/order/', options);
    };

    const handleCountryChange = (event) => setSelectedCountry(event.target.value);

    return (
        <div className="checkout-page">
            <div className="checkout-heading-container">
                <h1 id="checkout-heading">Checkout form</h1>
            </div>
            <div className="checkout-container">

                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="form-group-row">
                        <FormGroup label="Name:" value={name} onChange={setName} required />
                        <FormGroup label="Surname:" value={surname} onChange={setSurname} required />
                    </div>
                    <div className="form-group-row">
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
                        <FormGroup label="Shipping Address:" value={shippingAddress} onChange={setShippingAddress} required />
                    </div>
                    <div className="form-group-row">
                        <div className="checkout-form-group">
                            <label htmlFor="paymentMethod">Payment Method:</label>
                            <select id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
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
                    </div>
                    <div className="form-group-row">
                        <FormGroup label="City:" value={city} onChange={setCity} required />
                        <FormGroup label="Post Code:" value={postCode} onChange={setPostCode} required />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-button">Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FormGroup = ({ label, value, onChange, required = false }) => (
    <div className="checkout-form-group">
        <label>{label}</label>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} required={required} />
    </div>
);

export default CheckoutPage;