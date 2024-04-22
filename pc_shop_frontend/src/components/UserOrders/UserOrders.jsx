import React, { useState, useEffect } from 'react';

function UserOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/cart/orders/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>User Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <p>Shipping Fee: {order.shipping_fee}</p>
                        <p>Total Price: {order.total_price}</p>
                        <p>Shipping Address: {order.shipping_address}</p>
                        <p>Payment Info: {order.payment_info}</p>
                        <p>Status: {order.status}</p>
                        <p>Created At: {order.created_at}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserOrders;
