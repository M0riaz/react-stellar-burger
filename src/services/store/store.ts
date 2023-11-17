import {socketMiddleware} from "../middleware/socket-middleware";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";

import {
    ORDERS_FEED_ALL_CONNECT,
    ORDERS_FEED_ALL_DISCONNECT,

    ORDERS_FEED_ALL_WS_CONNECTING,
    ORDERS_FEED_ALL_WS_OPEN,
    ORDERS_FEED_ALL_WS_CLOSE,
    ORDERS_FEED_ALL_WS_MESSAGE,
    ORDERS_FEED_ALL_WS_ERROR,
} from '../actions/ordersFeedAllAction'

import {
    ORDERS_FEED_USER_CONNECT,
    ORDERS_FEED_USER_DISCONNECT,

    ORDERS_FEED_USER_WS_CLOSE,
    ORDERS_FEED_USER_WS_CONNECTING,
    ORDERS_FEED_USER_WS_ERROR,
    ORDERS_FEED_USER_WS_MESSAGE,
    ORDERS_FEED_USER_WS_OPEN
} from '../actions/ordersFeedUserAction'
import {itemReducer} from "../reducer/reducer";
import {getItems} from "../reducer/get_items";
import {getOrder} from "../reducer/get_order";
import {modal} from "../reducer/modal";
import {getPass} from "../reducer/registrationUser";
import {regNewUser} from "../reducer/regNewUser";
import {ordersFeedAllReducer} from "../reducer/ordersFeedAllReducer";
import {orderFeedUserReducer} from "../reducer/ordersFeedUserReducer";
import ReduxThunk from "redux-thunk";

const orderFeedAll = {
    wsConnect: ORDERS_FEED_ALL_CONNECT,
    wsDisconnect: ORDERS_FEED_ALL_DISCONNECT,
    onOpen: ORDERS_FEED_ALL_WS_OPEN,
    onClose: ORDERS_FEED_ALL_WS_CLOSE,
    onError: ORDERS_FEED_ALL_WS_ERROR,
    onMessage: ORDERS_FEED_ALL_WS_MESSAGE,
    wsConnecting: ORDERS_FEED_ALL_WS_CONNECTING,
}

const orderFeedUser = {
    wsConnect: ORDERS_FEED_USER_CONNECT,
    wsDisconnect: ORDERS_FEED_USER_DISCONNECT,
    onOpen: ORDERS_FEED_USER_WS_OPEN,
    onClose: ORDERS_FEED_USER_WS_CLOSE,
    onError: ORDERS_FEED_USER_WS_ERROR,
    onMessage: ORDERS_FEED_USER_WS_MESSAGE,
    wsConnecting: ORDERS_FEED_USER_WS_CONNECTING,
}


const accessToken: string | null = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken')!.slice(7) : '';


export const wsOrdersFeedAllUrl: string = 'wss://norma.nomoreparties.space/orders/all';
export const wsOrdersFeedUserUrl: string = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

const composeEnhancers =
    // @ts-ignore
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        // @ts-ignore
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

export const rootReducer = createStore(
    combineReducers({
        getOrder,
        itemReducer,
        getItems,
        modal,
        regNewUser,
        ordersFeedAllReducer,
        orderFeedUserReducer,
        getPass,

    }),
    composeEnhancers(applyMiddleware(ReduxThunk),
        applyMiddleware(socketMiddleware(orderFeedAll)),
        applyMiddleware(socketMiddleware(orderFeedUser))
    ))