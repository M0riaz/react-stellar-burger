import {IFeedOrders, IOrder} from "../../types/order";

export const ORDERS_FEED_ALL_CONNECT:'ORDERS_FEED_ALL_CONNECT' = 'ORDERS_FEED_ALL_CONNECT';
export const ORDERS_FEED_ALL_DISCONNECT:'ORDERS_FEED_ALL_DISCONNECT' = 'ORDERS_FEED_ALL_DISCONNECT';

export const ORDERS_FEED_ALL_WS_CONNECTING:'ORDERS_FEED_ALL_WS_CONNECTING' = 'ORDERS_FEED_ALL_WS_CONNECTING';
export const ORDERS_FEED_ALL_WS_OPEN:'ORDERS_FEED_ALL_WS_OPEN' = 'ORDERS_FEED_ALL_WS_OPEN';
export const ORDERS_FEED_ALL_WS_CLOSE:'ORDERS_FEED_ALL_WS_CLOSE' = 'ORDERS_FEED_ALL_WS_CLOSE';
export const ORDERS_FEED_ALL_WS_MESSAGE:'ORDERS_FEED_ALL_WS_MESSAGE' = 'ORDERS_FEED_ALL_WS_MESSAGE';
export const ORDERS_FEED_ALL_WS_ERROR:'ORDERS_FEED_ALL_WS_ERROR' = 'ORDERS_FEED_ALL_WS_ERROR';

interface IOrdersFeedAllConnect {
    readonly type : typeof ORDERS_FEED_ALL_CONNECT;
    readonly payload : string;
}
interface IOrdersFeedAllDisconnect {
    readonly type : typeof ORDERS_FEED_ALL_DISCONNECT
}
interface IOrdersFeedAllWsConnecting {
    readonly type : typeof ORDERS_FEED_ALL_WS_CONNECTING
}
interface IOrdersFeedAllWsOpen{
    readonly type : typeof ORDERS_FEED_ALL_WS_OPEN
}
interface IOrdersFeedAllWsClose{
    readonly type : typeof ORDERS_FEED_ALL_WS_CLOSE
}
interface IOrdersFeedAllWsMessage {
    readonly type : typeof ORDERS_FEED_ALL_WS_MESSAGE
    readonly payload : IFeedOrders
}
interface IOrdersFeedAllWsError {
    readonly type : typeof ORDERS_FEED_ALL_WS_ERROR
    readonly payload : string;
}

export type TOrdersFeedAll =
    IOrdersFeedAllConnect |
    IOrdersFeedAllDisconnect |
    IOrdersFeedAllWsConnecting |
    IOrdersFeedAllWsOpen|
    IOrdersFeedAllWsClose |
    IOrdersFeedAllWsMessage |
    IOrdersFeedAllWsError;

export const connectOrdersAll = (url: string):IOrdersFeedAllConnect => ({
    type: ORDERS_FEED_ALL_CONNECT,
    payload: url
});

export const disconnectOrdersAll = ():IOrdersFeedAllDisconnect => ({
    type: ORDERS_FEED_ALL_DISCONNECT,
});


