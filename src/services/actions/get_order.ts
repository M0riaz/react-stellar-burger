import {GET_ORDERS_FAILED, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS} from "./constants/constants";
import {checkResponse, dataOrder, registerNewUser} from "../../utils/url-API";
import {AppDispatch, AppThunk} from "../store/typesStore";
import { IOrderRequest} from "../../types/order";

interface IGetOrdersRequest {
    readonly type : typeof GET_ORDERS_REQUEST
}
interface IGetOrdersSuccess {
    readonly type : typeof GET_ORDERS_SUCCESS;
    readonly payload : number
}
interface IGetOrdersFailed {
    readonly type : typeof GET_ORDERS_FAILED;
    readonly payload : string
}

export type TOrdersRequest =
    IGetOrdersRequest |
    IGetOrdersSuccess |
    IGetOrdersFailed

export const getOrder: AppThunk = (i: Array<string>) => async (dispatch: AppDispatch) => {
    dispatch({type: GET_ORDERS_REQUEST});
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await dataOrder(i,accessToken );
        const data = await checkResponse(response);
        if (data.success) {
            dispatch({
                type: GET_ORDERS_SUCCESS,
                payload: data.order.number
            });
        } else {
            dispatch({
                type: GET_ORDERS_FAILED,
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: GET_ORDERS_FAILED,
            payload: 'Ошибка при загрузке данных'
        });
    }
}