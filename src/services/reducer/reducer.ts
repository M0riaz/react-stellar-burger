import {
    DELETE_INGREDIENT,
    ADD_INGREDIENT,
    ADD_BUN,
    REMOVE_BUN,
    UPDATE_ITEM,
    CLEAR_INGREDIENTS
} from "../actions/constants/constants";
import {TIngredientControl} from "../actions/actions";
import {IIngredient} from "../../types/ingridient";

interface IIngredientState {
    burgerConstructor: IIngredient[],
    bun: IIngredient | null,
    activeBun:IIngredient[]
}

const initialState:IIngredientState = {
    burgerConstructor: [],
    bun: null,
    activeBun:[]
};

export const itemReducer = (state : IIngredientState = initialState, action: TIngredientControl) => {
    switch (action.type) {

        case ADD_INGREDIENT: {
            state.burgerConstructor.push(action.payload)

            return {
                ...state,
                burgerConstructor: [...state.burgerConstructor],
            }
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                burgerConstructor: state.burgerConstructor.filter((_, index) => index !== action.payload)

            }
        }
        case CLEAR_INGREDIENTS:
            return {
                ...state,
                burgerConstructor: [],
                bun: null
            }

        case ADD_BUN: {
            return {
                ...state,
                bun: action.payload,
                activeBun: [action.payload]
            }
        }
        case REMOVE_BUN: {
            return {
                ...state,
                // bun: action.payload
            }
        }
        case UPDATE_ITEM: {
            return {
                ...state,
                burgerConstructor: action.payload
            }
        }
        default: {
            return state;
        }
    }
}
