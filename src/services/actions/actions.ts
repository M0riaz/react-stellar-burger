import {
    ADD_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    UPDATE_ITEM,
    REMOVE_BUN,
    CLEAR_INGREDIENTS,
    CLEAR_ORDER_NUMBER
} from "./constants/constants";
import {IIngredient} from "../../types/ingridient";

interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: IIngredient;
}
interface IDeleteIngredientById {
    readonly  type: typeof DELETE_INGREDIENT;
    readonly payload: string | number;
}
interface IAddBun {
    readonly type: typeof ADD_BUN;
    readonly payload: IIngredient;
}

interface IUpdateItem {
    readonly type: typeof UPDATE_ITEM;
    readonly payload: IIngredient[];
}

interface IRemoveBun {
 readonly type: typeof REMOVE_BUN
}

interface IClearIngredients {
    readonly type: typeof CLEAR_INGREDIENTS
}
export interface IClearOrderNumber {
    readonly type : typeof CLEAR_ORDER_NUMBER
}

export type TIngredientControl =
    IAddIngredient |
    IDeleteIngredientById |
    IAddBun | IUpdateItem |
    IRemoveBun |
    IClearIngredients |
    IClearOrderNumber;

export const addIngredient = (ingredient: IIngredient):IAddIngredient => {
    return {
        type: ADD_INGREDIENT,
        payload: ingredient
    }
}

export const deleteIngredientById = (ingredientId: string | number): IDeleteIngredientById => {
    return {
        type: DELETE_INGREDIENT,
        payload: ingredientId
    }
}

export const addBun = (bun: IIngredient): IAddBun => {
    return {
        type: ADD_BUN,
        payload: bun,
    }
}

//moving item
export const updateItem = (item: IIngredient[]): IUpdateItem => {
    return {
        type: UPDATE_ITEM,
        payload: item,
    }
}
export const removeBun = ():IRemoveBun => {
    return {
        type: REMOVE_BUN,
    }
}

export const clearIngredients = ():IClearIngredients => {
    return {
        type: CLEAR_INGREDIENTS
    }
}

export const clearOrderNumber = ():IClearOrderNumber => {
    return {
        type: CLEAR_ORDER_NUMBER
    }
};