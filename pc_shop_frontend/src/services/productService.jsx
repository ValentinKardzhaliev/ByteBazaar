const baseUrl = 'http://127.0.0.1:8000';

export const getAllProducts = () => {
    return fetch(`${baseUrl}/`)
        .then(res => res.json())
}

export const getProductsByCriteria = (searchingOption) => {
    return fetch(`${baseUrl}/?search_query=${searchingOption}`)
        .then(res => res.json())
}

export const getProductByTypeAndId = (typeOfProduct, productId) => {
    return fetch(`${baseUrl}/api/products/${typeOfProduct}/${productId}/`)
        .then(res => res.json())
}

export const getAllComputers = () => {
    return fetch(`${baseUrl}/api/products/computers/`)
        .then(res => res.json())
}

export const getAllComputersByQueryParams = (queryParams) => {
    return fetch(`${baseUrl}/api/products/computers/?${queryParams}`)
        .then(res => res.json())
}

export const getAllMonitorsByQueryParams = (queryParams) => {
    return fetch(`${baseUrl}/api/products/monitors/?${queryParams}`)
        .then(res => res.json())
}

export const getAllKeyboardsByQueryParams = (queryParams) => {
    return fetch(`${baseUrl}/api/products/keyboards/?${queryParams}`)
        .then(res => res.json())
}

export const likeProduct = (productId, token) => {
    return fetch(`${baseUrl}/like_product/${productId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
    })
        .then(res => res.json())
}

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


export const getAllLikedForUser = (token) => {
    return fetch(`${baseUrl}/liked_products/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
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


export const getAllGraphics = () => {
    return fetch(`${baseUrl}/api/products/graphics-count/`)
        .then(res => res.json())
}

export const getAllKeyboards = () => {
    return fetch(`${baseUrl}/api/products/keyboards/`)
        .then(res => res.json())
}

export const getAllMonitors = () => {
    return fetch(`${baseUrl}/api/products/monitors/`)
        .then(res => res.json())
}