import {WebsocketStatus} from "../../utils/ordersWS";
import {
    ORDERS_FEED_USER_WS_CLOSE,
    ORDERS_FEED_USER_WS_CONNECTING, ORDERS_FEED_USER_WS_ERROR, ORDERS_FEED_USER_WS_MESSAGE,
    ORDERS_FEED_USER_WS_OPEN, TOrdersFeedUser
} from '../actions/ordersFeedUserAction'
import {IOrder, IOrderRequest} from "../../types/order";
import {IFeedOrders} from "../../types/FeedOrders";



interface IOrderUserState {
    status: string,
    orders:  IOrderRequest[],
    connectingError: string
}

const initialState:IOrderUserState = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    connectingError: ''
}

export const orderFeedUserReducer = (state : IOrderUserState = initialState, action: TOrdersFeedUser) => {
    switch (action.type){
        case ORDERS_FEED_USER_WS_CONNECTING:
            return{
                ...state,
                status: WebsocketStatus.CONNECTING
            };


        case ORDERS_FEED_USER_WS_OPEN:
            return {
                ...state,
                status: WebsocketStatus.ONLINE,
                connectingError: ''
            }

        case ORDERS_FEED_USER_WS_CLOSE:
            return {
                ...state,
                status: WebsocketStatus.OFFLINE
            }

        case ORDERS_FEED_USER_WS_ERROR:
            return {
                ...state,
                connectingError: action.payload
            }

        case ORDERS_FEED_USER_WS_MESSAGE:
            return {
                ...state,
                orders: action.payload
            }

        default: {
            return state
        }
    }
}