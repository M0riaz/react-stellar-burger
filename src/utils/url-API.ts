import {string} from "prop-types";
import {tokens} from "../services/actions/get_order";
import {extend} from "immutability-helper";

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

const request = (endpoint:string, options: RequestInit | undefined) => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)

};

// export const dataIngredients = (): Promise<Response> => {
//     return fetch(
//         `${BASE_URL}ingredients`
//     )
// };


export const dataIngredients = () => {
    return request('ingredients', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
}

export const dataOrder = (data: string[], token: string) => {
    return request('orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: token
        },
        body: JSON.stringify({
            ingredients: data
        }),
    })
};

interface IEmail {
    email: string
}

export const recoveryPassword = ({email}: IEmail): Promise<Response> => {
    return fetch(`${BASE_URL}password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            email: email
        })
    })
}

export const resetPassword = (data: IResetPasswordData): Promise<Response> => {
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


export const registerNewUser = (data: IRegisterNewUserData): Promise<Response> => {
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

export const loginUser = (data: ILoginUser): Promise<Response> => {
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

export const logOut = (data: string): Promise<Response> => {
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

export const refreshToken = (): Promise<Response> => {
    return fetch(`${BASE_URL}auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),

        }),
    })
};
type RequestOptions =  {
    method: string,
    headers: {
        'Content-Type': string,
        'authorization': string| null,
    },
    body?: any,
};

export const fetchWithRefresh = async (url:string, options: RequestOptions) => {
    try {
        const res = await fetch(url, options as RequestInit);
        return await checkResponse(res);
    } catch (err:any) {

        if (err.message === "jwt expired") {
            const refreshData:any = await refreshToken(); //обновляем токен
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options as RequestInit); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}
//
export const getUser = (): Promise<any> => {

    return fetchWithRefresh(`${BASE_URL}auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'authorization': localStorage.getItem('accessToken')
        },

    })
}

export const updateUserInfo = (data: IRegisterNewUserData): Promise<any> => {
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
