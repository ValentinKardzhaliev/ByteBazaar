import './Cart.css'

function Cart() {
    const cartItems = [
        {
            id: 1,
            name: 'Product 1',
            price: 19.99,
            image: 'https://placekitten.com/50/50', // Placeholder image
        },
        {
            id: 2,
            name: 'Product 2',
            price: 29.99,
            image: 'https://placekitten.com/50/51', // Placeholder image
        },
        // Add more items as needed
    ];
    const handleDetailsClick = (itemId) => {
        // Handle details click, e.g., navigate to a product details page
        console.log(`View details for item with ID ${itemId}`);
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <div className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <p>{item.name}</p>
                                    <br />
                                    <p>${item.price.toFixed(2)}</p>
                                    <br />
                                    <button className='btnCartDetails' onClick={() => handleDetailsClick(item.id)}>
                                        Details
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}


export default Cart;