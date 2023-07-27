import {GET_ORDERS_FAILED, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS} from "../actions/constants/constants";
const initialState = {
    orderRequest: false,
    orderFailed: false,
     order: null,
    orderError: null,
}

export const getOrder = (state = initialState, action) => {
    switch (action.type) {
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
        case 'CLEAR_ORDER_NUMBER':
            return {
                ...state,
                order: null
            };
        default: {
            return state;
        }
    }
}