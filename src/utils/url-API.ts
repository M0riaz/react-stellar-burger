import {string} from "prop-types";

interface IResetPasswordData {
    password: string,
    token: string
}

interface IRegisterNewUserData {
    email: string,
    name: string,
    password: string
}

interface ILoginUser {
    email: string,
    password: string
}

export const BASE_URL = 'https://norma.nomoreparties.space/api/';

export const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
};

export const dataIngredients = () => {
    return fetch(
        `${BASE_URL}ingredients`
    )
};
export const dataOrder = (data:string[], token:any) => {
    return fetch(`${BASE_URL}orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: token
        },
        body: JSON.stringify({
            ingredients: data
        }),
    })
};

export const recoveryPassword = (email: string) => {
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

export const resetPassword = (data: IResetPasswordData) => {
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


export const registerNewUser = (data: IRegisterNewUserData) => {
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

export const loginUser = (data: ILoginUser) => {
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

export const logOut = (data: string) => {
    return fetch(`${BASE_URL}auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(
            data
        )
    })
}

export const refreshToken = () => {
    return fetch(`${BASE_URL}auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            // token: token
            token: localStorage.getItem("refreshToken"),

        }),
    })
};

interface II{
    method: string,
    headers : {
        'Content-Type': string;
        'authorization': string | null;
    }
    body?: any
}

export const fetchWithRefresh = async (url:string, options: II) => {
    try {
        // @ts-ignore
        const res = await fetch(url, options);
        return await checkResponse(res);

    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            // @ts-ignore
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            // @ts-ignore
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            // @ts-ignore
            localStorage.setItem("accessToken", refreshData.accessToken);
            // @ts-ignore
            options.headers.authorization = refreshData.accessToken;
            // @ts-ignore
            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}
//
export const getUser = () => {
    return fetchWithRefresh(`${BASE_URL}auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
             'authorization': localStorage.getItem('accessToken')

        }
    })
}

export const updateUserInfo = (data: IRegisterNewUserData) => {
    const {email, password, name} = data
    return fetchWithRefresh(`${BASE_URL}auth/user`, {
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
