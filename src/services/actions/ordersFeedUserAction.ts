import {IOrder, IOrderRequest} from "../../types/order";
import {IFeedOrders} from "../../types/FeedOrders";

export const ORDERS_FEED_USER_CONNECT: 'ORDERS_FEED_USER_CONNECT' = 'ORDERS_FEED_USER_CONNECT';
export const ORDERS_FEED_USER_DISCONNECT: 'ORDERS_FEED_USER_DISCONNECT' = 'ORDERS_FEED_USER_DISCONNECT';

export const ORDERS_FEED_USER_WS_CONNECTING: 'ORDERS_FEED_USER_WS_CONNECTING' = 'ORDERS_FEED_USER_WS_CONNECTING';
export const ORDERS_FEED_USER_WS_OPEN: 'ORDERS_FEED_USER_WS_OPEN' = 'ORDERS_FEED_USER_WS_OPEN';
export const ORDERS_FEED_USER_WS_CLOSE: 'ORDERS_FEED_USER_WS_CLOSE' = 'ORDERS_FEED_USER_WS_CLOSE';
export const ORDERS_FEED_USER_WS_MESSAGE: 'ORDERS_FEED_USER_WS_MESSAGE' = 'ORDERS_FEED_USER_WS_MESSAGE';
export const ORDERS_FEED_USER_WS_ERROR: 'ORDERS_FEED_USER_WS_ERROR' = 'ORDERS_FEED_USER_WS_ERROR';

interface IOrdersFeedUserConnect {
    readonly type : typeof ORDERS_FEED_USER_CONNECT;
    readonly payload : string
}

interface IOrdersFeedUserDisconnect {
    readonly type : typeof ORDERS_FEED_USER_DISCONNECT
}

interface IOrdersFeedUserWsConnecting{
    readonly type : typeof ORDERS_FEED_USER_WS_CONNECTING
}
interface IOrdersFeedUserWsOpen{
    readonly type : typeof ORDERS_FEED_USER_WS_OPEN
}
interface IOrdersFeedUserWsClose{
    readonly type : typeof ORDERS_FEED_USER_WS_CLOSE
}
interface IOrdersFeedUserWsMessage{
    readonly type : typeof ORDERS_FEED_USER_WS_MESSAGE
    readonly payload : IOrderRequest[]
}
interface IOrdersFeedUserWsError{
    readonly type : typeof ORDERS_FEED_USER_WS_ERROR
    readonly payload : string;
}

export type TOrdersFeedUser =
    IOrdersFeedUserConnect |
    IOrdersFeedUserDisconnect |
    IOrdersFeedUserWsConnecting |
    IOrdersFeedUserWsOpen |
    IOrdersFeedUserWsClose |
    IOrdersFeedUserWsMessage |
    IOrdersFeedUserWsError;

export const connectOrdersUser = (url: string):IOrdersFeedUserConnect => ({
    type: ORDERS_FEED_USER_CONNECT,
    payload: url
});

export const disconnectOrdersUser = ():IOrdersFeedUserDisconnect => ({
    type: ORDERS_FEED_USER_DISCONNECT,
});

