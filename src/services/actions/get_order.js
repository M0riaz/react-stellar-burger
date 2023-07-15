import {GET_ORDERS_FAILED, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS} from "./constants/constants";
import {dataOrder} from "../../utils/url-API";

export const getOrder = (data) => {
    return function (dispatch) {
        dispatch({
            type: GET_ORDERS_REQUEST
        });
        dataOrder(data)
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(response => {
                                dispatch({
                                    type: GET_ORDERS_SUCCESS,
                                    payload: response.order.number
                                })
                            }
                        )
                } else {
                    dispatch({
                        type: GET_ORDERS_FAILED,
                        payload: 'Ошибка при загрузке данных'
                    });
                }
            }).catch(err => {
            dispatch({
                type: GET_ORDERS_FAILED,
                payload: 'Ошибка при загрузке данных'
            })
        })
    };
}