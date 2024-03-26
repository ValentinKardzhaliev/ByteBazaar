const baseUrl = 'http://127.0.0.1:8000';

// *service for likes

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

export const getAllLikedProductsForUser = (token) => {
    return fetch(`${baseUrl}/liked_products/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
    })
        .then(res => res.json())
}

// *service for likes