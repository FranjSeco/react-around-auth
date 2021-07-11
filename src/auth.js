export const BASE_URL = 'https://register.nomoreparties.co';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/auth/local/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err));
}

export const authorize = (identifier, password) => {
    return fetch(`${BASE_URL}/auth/local`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({identifier, password})
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        if(data.user) {
            localStorage.setItem('jwt', data.jwt);
            return data;
        } else {
            return;
        }
    })
    .catch(err => console.log(err));
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => data)
}