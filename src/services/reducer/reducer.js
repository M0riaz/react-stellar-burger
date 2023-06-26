import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILED,
    DELETE_INGREDIENT,
    ADD_INGREDIENT,
    ADD_BUN,
    OPEN_MODAL,
    CLOSE_MODAL,


} from "../actions/constants/constants";
const initialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
    orderRequest: false,
    orderFailed: false,
    order: -1,
    modalActive: false,
    orderError: null,
    itemsError: null,
    burgerConstructor: [],
    item: {},
    bun: null,
    movingItem: [],
    activeBun:[]
};

export const itemReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ITEMS_REQUEST: {
            return {
                ...state,
                itemsRequest: true,
                itemsFailed: false
            };
        }
        case  GET_ITEMS_SUCCESS: {
            return {
                ...state,
                items: action.payload,
                itemsRequest: false

            }
        }
        case GET_ITEMS_FAILED: {
            return {
                ...state,
                itemsFailed: true,
                itemsRequest: false,
                itemsError: action.payload
            };
        }
        case GET_ORDERS_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false
            };
        }
        case  GET_ORDERS_SUCCESS: {
            return {
                ...state,
                order: action.payload,
                orderRequest: false

            }
        }
        case  GET_ORDERS_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
                orderError: action.payload
            };
        }

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
        case 'REMOVE_BUN': {
            return {
                ...state,
                bun: action.payload
            }
        }
        case OPEN_MODAL:
            return {
                ...state,
                item: action.payload

            };
        case CLOSE_MODAL:
            return {
                ...state,
                ingredientData: {}
            };
        case 'UPDATE_ITEM': {
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
