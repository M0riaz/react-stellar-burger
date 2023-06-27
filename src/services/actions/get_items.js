import {GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS} from "./constants/constants";
import {checkResponse, dataIngredients} from "../../utils/url-API";

export const getItems = () => async (dispatch) => {
    dispatch({type: GET_ITEMS_REQUEST});
    try {
        const response = await dataIngredients();
        const data = await checkResponse(response);
        if (data.success) {
            dispatch({
                type: GET_ITEMS_SUCCESS,
                payload: data.data
            });
        } else {
            dispatch({
                type: GET_ITEMS_FAILED,
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: GET_ITEMS_FAILED,
            payload: 'Ошибка при загрузке данных'
        });
    }
};