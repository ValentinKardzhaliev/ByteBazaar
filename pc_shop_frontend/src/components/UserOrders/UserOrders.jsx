import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import './UserOrders.css'

function UserOrders() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const headers = {};

                if (user && user.token) {
                    headers.Authorization = `Token ${user.token}`;
                }

                const response = await fetch('https://bytebazaar.pythonanywhere.com/api/cart/orders/', {
                    headers: headers
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchOrders();
    }, [user]);

    return (
        <div className="user-orders-container">
            <h1>User Orders</h1>
            <ul className="order-list">
                {orders.map(order => (
                    <li key={order.id} className="order-item">
                        <p className="order-detail">Order ID: {order.id}</p>
                        <p className="order-detail">Shipping Fee: {order.shipping_fee}</p>
                        <p className="order-detail">Total Price: {order.total_price}</p>
                        <p className="order-detail">Shipping Address: {order.shipping_address}</p>
                        <p className="order-detail">Payment Info: {order.payment_info}</p>
                        <p className="order-detail">Status: {order.status}</p>
                        <p className="order-detail">Created At: {order.created_at}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default UserOrders;
