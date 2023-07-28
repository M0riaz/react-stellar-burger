import {WebsocketStatus} from "../../utils/ordersWS";
import {
    ORDERS_FEED_ALL_WS_CLOSE,
    ORDERS_FEED_ALL_WS_CONNECTING, ORDERS_FEED_ALL_WS_ERROR, ORDERS_FEED_ALL_WS_MESSAGE,
    ORDERS_FEED_ALL_WS_OPEN
} from "../actions/ordersFeedAllAction";

const initialState = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    connectingError: ''
}

export const ordersFeedAllReducer = (state = initialState, action) => {
    switch (action.type){
        case ORDERS_FEED_ALL_WS_CONNECTING:
            return{
                ...state,
                status: WebsocketStatus.CONNECTING
            };


        case ORDERS_FEED_ALL_WS_OPEN:
            return {
                ...state,
                status: WebsocketStatus.ONLINE,
                connectingError: ''
            }

        case ORDERS_FEED_ALL_WS_CLOSE:
            return {
                ...state,
                status: WebsocketStatus.OFFLINE
            }

        case ORDERS_FEED_ALL_WS_ERROR:
            return {
                ...state,
                connectingError: action.payload
            }

        case ORDERS_FEED_ALL_WS_MESSAGE:
            // console.log(state.orders)
            return {
                ...state,
                orders: action.payload
            }

        default: {
            return state
        }
    }
}