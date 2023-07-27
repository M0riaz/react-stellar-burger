import {ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, UPDATE_ITEM, REMOVE_BUN} from "./constants/constants";


export const addIngredient = (ingredient) => {
    return{
        type: ADD_INGREDIENT,
        payload: ingredient
    }
}

export const deleteIngredientById = (ingredientId) => {
    return{
        type: DELETE_INGREDIENT,
        payload: ingredientId
    }
}

export const addBun = (bun) => {
    return{
        type: ADD_BUN,
        payload: bun,
    }
}

export const updateItem = (item) => {
    return{
        type: UPDATE_ITEM,
        payload: item,
    }
}
export const removeBun = () => {
    return{
        type: REMOVE_BUN,
    }
}

export const clearIngredients = () => {
    return {
        type: "CLEAR_INGREDIENTS"
    }
}

export const clearOrderNumber = () => ({
    type: 'CLEAR_ORDER_NUMBER'
});