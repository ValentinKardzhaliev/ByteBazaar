const baseUrl = 'http://127.0.0.1:8000/';

// *service for products

export const getAllProducts = () => {
    return fetch(`${baseUrl}/`)
        .then(res => res.json())
}
export const getItems = (category) => {
    return fetch(`${baseUrl}/api/products/${category}/`)
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

export const getAllCharacteristics = (characteristic) => {
    return fetch(`${baseUrl}/api/products/characteristic-count/${characteristic}/`)
        .then(res => res.json())
}

// *service for products