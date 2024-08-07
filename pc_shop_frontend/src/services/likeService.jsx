const baseUrl = 'https://bytebazaar.pythonanywhere.com/';

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