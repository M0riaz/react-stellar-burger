import {GET_ORDERS_FAILED, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS} from "./constants/constants";
import {checkResponse, dataOrder, registerNewUser} from "../../utils/url-API";

export const getOrder = (i) => async (dispatch) => {
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