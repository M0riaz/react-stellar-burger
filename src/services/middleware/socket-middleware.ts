import {TWsActionTypes} from "./TWsActionTypes";
import {TOrdersFeedUser} from "../actions/ordersFeedUserAction";
import {TOrdersFeedAll} from "../actions/ordersFeedAllAction";

export const socketMiddleware = (wsActions: TWsActionTypes) => {
    return (store: { dispatch: (type: TOrdersFeedUser | TOrdersFeedAll) => void }) => {
        let socket: WebSocket | null = null;
        return (next: (act: TOrdersFeedUser | TOrdersFeedAll) => void) => (action: TOrdersFeedUser | TOrdersFeedAll) => {
            const {dispatch} = store;
            const {type} = action;
            const {
                wsConnect,
                // wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting,
                wsDisconnect,
            } = wsActions;
            if (type === wsConnect) {
                socket = new WebSocket(action.payload);
                dispatch({type: wsConnecting});
            }
            if (socket) {
                socket.onopen = () => {
                    dispatch({type: onOpen});
                };
                socket.onerror = () => {
                    dispatch({type: onError, payload: 'Ошибка'});
                };
                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);
                    dispatch({type: onMessage, payload: parsedData});
                };
                socket.onclose = () => {
                    dispatch({type: onClose});
                };
                // if (type === wsSendMessage) {
                //     socket.send(JSON.stringify(action.payload));
                // }
                if (type === wsDisconnect) {
                    socket.close();
                    socket = null;
                }
            }
            next(action);
        };
    };
};