import {retry} from "@reduxjs/toolkit/query";

export const BASE_URL =  'https://norma.nomoreparties.space/api/';

export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err)=> Promise.reject(err))
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
