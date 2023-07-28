import rootReducer from "../rootReducer/rootReducer";
import {socketMiddleware} from "../middleware/socket-middleware";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";

import {
ORDERS_FEED_ALL_CONNECT,
ORDERS_FEED_ALL_DISCONNECT ,

ORDERS_FEED_ALL_WS_CONNECTING,
ORDERS_FEED_ALL_WS_OPEN,
ORDERS_FEED_ALL_WS_CLOSE,
ORDERS_FEED_ALL_WS_MESSAGE,
ORDERS_FEED_ALL_WS_ERROR,
} from '../actions/ordersFeedAllAction'

import {
    ORDERS_FEED_USER_CONNECT,
    ORDERS_FEED_USER_DISCONNECT ,

    ORDERS_FEED_USER_WS_CLOSE,
    ORDERS_FEED_USER_WS_CONNECTING,
    ORDERS_FEED_USER_WS_ERROR,
    ORDERS_FEED_USER_WS_MESSAGE,
    ORDERS_FEED_USER_WS_OPEN
} from '../actions/ordersFeedUserAction'

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

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken').slice(7) : '';


export const wsOrdersFeedAllUrl = 'wss://norma.nomoreparties.space/orders/all';
export const wsOrdersFeedUserUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;


const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk),
    applyMiddleware(socketMiddleware(orderFeedAll)),
    applyMiddleware(socketMiddleware(orderFeedUser)),
    );

export const store = createStore(rootReducer, enhancer);
