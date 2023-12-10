const baseUrl = 'http://127.0.0.1:8000/api';

export const loginUser = (username, password) => {
    return fetch(`${baseUrl}/login/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
}

export const logoutUser = (token) => {
    return fetch(`${baseUrl}/logout/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Token ' + token
        }
    })
        .then(res => res.json())
}