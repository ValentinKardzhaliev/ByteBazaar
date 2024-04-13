const baseUrl = 'https://bytebazaar.pythonanywhere.com/api/auth/';

export const loginUser = (username, password) => {
    return fetch(`${baseUrl}login/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
}
export const registerUser = (username, email, password, password_confirmation, phone) => {
    return fetch(`${baseUrl}register/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, password_confirmation, phone })

    })
        .then(res => res.json())
}

export const logoutUser = (token) => {
    return fetch(`${baseUrl}logout/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Token ' + token
        }
    })
        .then(res => res.json())
}