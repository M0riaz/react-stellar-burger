import {GET_ORDERS_FAILED, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, CLEAR_ORDER_NUMBER} from "../actions/constants/constants";
import {IOrder} from "../../types/order";
import {TOrdersRequest} from "../actions/get_order";
import {IClearOrderNumber} from "../actions/actions";

type TOrders = IClearOrderNumber | TOrdersRequest

interface IGetOrderState {
    orderRequest: boolean;
    orderFailed: boolean;
    order: number | null;
    orderError: string | null;
}

const initialState :IGetOrderState = {
    orderRequest: false,
    orderFailed: false,
     order: null,
    orderError: null,
}

export const getOrder = (state: IGetOrderState = initialState, action: TOrders) => {
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
        case CLEAR_ORDER_NUMBER:
            return {
                ...state,
                order: null
            };
        default: {
            return state;
        }
    }
}