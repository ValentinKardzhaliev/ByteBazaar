const baseUrl = 'https://bytebazaar.pythonanywhere.com/';

function readCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setCookie(name, value, days = 7) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=None; Secure`;
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
    const cartToken = readCookie('cart-token');
    let headers = {
        'Content-Type': 'application/json',
    };
    if (cartToken) {
        headers['Cart-Token'] = cartToken;
    }

    return fetch(`${baseUrl}/api/cart/add/${productId}/`, {
        method: 'POST',
        headers: headers,
    })
        .then(res => res.json())
        .then(data => {
            if (!cartToken && data['token']) {
                setCookie('cart-token', data['token']);
            }
            return data;
        })
        .catch(error => {
            console.error('Error adding to guest cart:', error);
            throw error;
        });
};

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
    const cartToken = readCookie('cart-token');
    let headers = {
        'Content-Type': 'application/json',
    };
    if (cartToken) {
        headers['Cart-Token'] = cartToken;
    }

    return fetch(`${baseUrl}/api/cart/increase_quantity/${productId}/`, {
        method: 'POST',
        headers: headers,
    })
        .then(res => res.json())
        .then(data => {
            if (!cartToken && data['token']) {
                setCookie('cart-token', data['token']);
            }
            return data;
        })
        .catch(error => {
            console.error('Error increasing product quantity for guest:', error);
            throw error;
        });
};

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
    const cartToken = readCookie('cart-token');
    let headers = {
        'Content-Type': 'application/json',
    };
    if (cartToken) {
        headers['Cart-Token'] = cartToken;
    }

    return fetch(`${baseUrl}/api/cart/decrease_quantity/${productId}/`, {
        method: 'POST',
        headers: headers,
    })
        .then(res => res.json())
        .then(data => {
            if (!cartToken && data['token']) {
                setCookie('cart-token', data['token']);
            }
            return data;
        })
        .catch(error => {
            console.error('Error decreasing product quantity for guest:', error);
            throw error;
        });
};
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
    const cartToken = readCookie('cart-token');
    let headers = {
        'Content-Type': 'application/json',
    };
    if (cartToken) {
        headers['Cart-Token'] = cartToken;
    }

    return fetch(`${baseUrl}/api/cart/remove/${productId}/`, {
        method: 'POST',
        headers: headers,
    })
        .then(res => res.json())
        .then(data => {
            if (!cartToken && data['token']) {
                setCookie('cart-token', data['token']);
            }
            return data;
        })
        .catch(error => {
            console.error('Error removing product from guest cart:', error);
            throw error;
        });
};

export const getUserOrders = (user) => {
    const cartToken = readCookie('cart-token');

    let headers = {
        'Content-Type': 'application/json',
    };
    if (cartToken) {
        headers['Cart-Token'] = cartToken;
    }
    if (user && user.token) {
        headers.Authorization = `Token ${user.token}`;
    }

    return fetch(`${baseUrl}/api/cart/orders/`, {
        method: 'GET',
        headers: headers,
    })
        .then(res => res.json())
        .then(data => {
            if (!cartToken && data['token']) {
                setCookie('cart-token', data['token']);
            }
            return data;
        })
        .catch(error => {
            console.error('Error removing product from guest cart:', error);
            throw error;
        });
};

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
    const cartToken = readCookie('cart-token');
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (cartToken) {
        options.credentials = "include";
        options.headers['Cart-Token'] = cartToken;
    }

    return fetch(`${baseUrl}/api/cart/user_cart/`, options)
        .then(res => res.json())
        .then(data => {
            if (!cartToken && data['token']) {
                setCookie('cart-token', data['token']);
            }
            return data;
        })
        .catch(error => {
            console.error('Error fetching guest cart:', error);
            throw error;
        });
};