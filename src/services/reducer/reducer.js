import {
    DELETE_INGREDIENT,
    ADD_INGREDIENT,
    ADD_BUN,
    REMOVE_BUN,
    UPDATE_ITEM,
} from "../actions/constants/constants";
const initialState = {
    burgerConstructor: [],
    bun: null,
    activeBun:[]
};

export const itemReducer = (state = initialState, action) => {
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
                bun: action.payload
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
