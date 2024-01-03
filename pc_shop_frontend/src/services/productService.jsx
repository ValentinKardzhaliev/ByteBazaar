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