export const BASE_URL = 'https://norma.nomoreparties.space/api/';

export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
};

export const dataIngredients = () => {
    return fetch(
        `${BASE_URL}ingredients`
    )
};
export const dataOrder = (data) => {
    return fetch(`${BASE_URL}orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ingredients: data
        }),
    })
};

export const recoveryPassword = (email) => {
    return fetch(`${BASE_URL}password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            email
        })
    })
}

export const resetPassword = (data) => {
    const {password, token} = data;
    return fetch(`${BASE_URL}password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            password,
            token
        })
    })
}


export const registerNewUser = (data) => {
    const {email, password, name} = data;
    return fetch(`${BASE_URL}auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            email, password, name
        })
    })
}

export const loginUser = (data) => {
    const {email, password} = data
    return fetch(`${BASE_URL}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
}

export const logOut = (data) => {
    const {token} = data
    return fetch(`${BASE_URL}auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            token
        })
    })
}

export const refreshToken = (token) => {
    return fetch(`${BASE_URL}auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            token
        })
    });
}

export const getUser = () => {
    return fetch(`${BASE_URL}auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'authorization': localStorage.getItem('accessToken')
        }
    })
}

export const updateUserInfo = (data) => {
    const {email, password, name} = data
    return fetch(`${BASE_URL}auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            email, password, name
        })
    })
}
