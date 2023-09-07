import {GET_NEW_PASSWORD_FAILED, GET_NEW_PASSWORD_REQUEST, GET_NEW_PASSWORD_SUCCESS} from "./constants/constants";
import {checkResponse, resetPassword} from "../../utils/url-API";
import {IResetPass, IResetPassData} from "../../types/IresetPass";
import {AppDispatch, AppThunk} from "../store/typesStore";

interface IGetNewPasswordRequest{
    readonly type: typeof GET_NEW_PASSWORD_REQUEST
}
interface IGetNewPasswordSuccess{
    readonly type: typeof GET_NEW_PASSWORD_SUCCESS
    // readonly payload : IResetPassData
}
interface IGetNewPasswordFailed{
    readonly type: typeof GET_NEW_PASSWORD_FAILED
    readonly payload : string
}

export type TResetPass =
    IGetNewPasswordRequest |
    IGetNewPasswordSuccess |
    IGetNewPasswordFailed

export const resetPass : AppThunk = (i: IResetPass) => async (dispatch : AppDispatch) => {
    dispatch({type: GET_NEW_PASSWORD_REQUEST});
    try {
        const response = await resetPassword(i);
        const data = await checkResponse(response);

        if (data.success) {
            dispatch({
                type: GET_NEW_PASSWORD_SUCCESS,
                // payload: data
            });
        } else {
            dispatch({
                type: GET_NEW_PASSWORD_FAILED,
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: GET_NEW_PASSWORD_FAILED,
            payload: 'Ошибка при загрузке данных'
        });
    }
}