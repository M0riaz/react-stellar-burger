import {GET_LOGIN_USER_FAILED, GET_LOGIN_USER_REQUEST, GET_LOGIN_USER_SUCCESS} from "./constants/constants";
import {checkResponse, loginUser} from "../../utils/url-API";
import {ILoginCurrentUser, ILoginCurrentUserData} from "../../types/iLoginCurrentUser";
import {AppDispatch, AppThunk} from "../store/typesStore";


interface IGetLoginUserRequest {
    readonly type : typeof GET_LOGIN_USER_REQUEST
}
interface IGetLoginUserSuccess {
    readonly type : typeof GET_LOGIN_USER_SUCCESS;
    readonly payload : ILoginCurrentUserData
}
interface IGetLoginUserFailed{
    readonly type : typeof GET_LOGIN_USER_FAILED;
    readonly payload : string;
}

export type TLoginCurrentUser =
    IGetLoginUserRequest |
    IGetLoginUserSuccess |
    IGetLoginUserFailed

export const loginCurrentUser: AppThunk = (i:ILoginCurrentUser) => async (dispatch : AppDispatch) => {
    dispatch({type: GET_LOGIN_USER_REQUEST});
    try {
        const response = await loginUser(i);
        const data = await checkResponse(response);
        if (data.success) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            dispatch({
                type: GET_LOGIN_USER_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: GET_LOGIN_USER_FAILED,
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: GET_LOGIN_USER_FAILED,
            payload: 'Ошибка при загрузке данных'
        });
    }
}