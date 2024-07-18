import React, { useState, useEffect, useContext } from 'react';
import './UserOrders.css'
import { getUserOrders } from '../../services/cartService';
import AuthContext from '../../contexts/AuthContext';

function UserOrders() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getUserOrders(user)
            .then(data => {
                console.log(data);
                setOrders(data)
            })
            .catch(err => console.log(err))
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