//отправка эл. почты для получения кода-токена
import {GET_PASS_FAILED, GET_PASS_REQUEST, GET_PASS_SUCCESS} from "./constants/constants";
import {checkResponse, recoveryPassword} from "../../utils/url-API";
import {AppDispatch, AppThunk} from "../store/typesStore";
import {IPassRequest} from "../../types/iPassRequest";


interface IGetPassRequest {
    readonly type : typeof GET_PASS_REQUEST
}
interface IGetPassSuccess {
    readonly type : typeof GET_PASS_SUCCESS;
    // readonly payload : IPassRequest
}
interface IGetPassFailed {
    readonly type : typeof GET_PASS_FAILED;
    readonly payload : string
}

export type TGetPass =
    IGetPassRequest |
    IGetPassSuccess |
    IGetPassFailed;

export const getPass: AppThunk = (Q: string) => async (dispatch: AppDispatch) => {
    dispatch({type: GET_PASS_REQUEST});
    try {
        const response = await recoveryPassword(Q);
        const data = await checkResponse(response);
        console.log(data)
        if (data.success) {
            dispatch({
                type: GET_PASS_SUCCESS,
                // payload: data
            });
        } else {
            dispatch({
                type: GET_PASS_FAILED,
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: GET_PASS_FAILED,
            payload: 'Ошибка при загрузке данных'
        });
    }
}