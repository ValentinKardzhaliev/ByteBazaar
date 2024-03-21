const baseUrl = 'http://127.0.0.1:8000';

// *service for cart

export const addToCart = (productId, token) => {
    return fetch(`${baseUrl}/api/cart/add/${productId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
    })
        .then(res => res.json())
}

export const addToCartForGuest = (productId) => {
    return fetch(`${baseUrl}/api/cart/add/${productId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
}

export const increaseProductQuantity = (productId, token) => {
    return fetch(`${baseUrl}/api/cart/increase_quantity/${productId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
    })
        .then(res => res.json())
}

export const increaseProductQuantityForGuest = (productId) => {
    return fetch(`${baseUrl}/api/cart/increase_quantity/${productId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
}

export const decreaseProductQuantity = (productId, token) => {
    return fetch(`${baseUrl}/api/cart/decrease_quantity/${productId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
    })
        .then(res => res.json())
}

export const decreaseProductQuantityForGuest = (productId) => {
    return fetch(`${baseUrl}/api/cart/decrease_quantity/${productId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
}

export const removeProductFromCart = (productId, token) => {
    return fetch(`${baseUrl}/api/cart/remove/${productId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
    })
        .then(res => res.json())
}

export const removeProductFromCartForGuest = (productId) => {
    return fetch(`${baseUrl}/api/cart/remove/${productId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
}

export const getUserCart = (token) => {
    return fetch(`${baseUrl}/api/cart/user_cart/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
    })
        .then(res => res.json())
}

export const getGuestCart = () => {
    return fetch(`${baseUrl}/api/cart/user_cart/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
}

// *service for cart