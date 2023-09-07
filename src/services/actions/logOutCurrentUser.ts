import {GET_LOGOUT_USER_FAILED, GET_LOGOUT_USER_REQUEST, GET_LOGOUT_USER_SUCCESS} from "./constants/constants";
import {checkResponse, logOut} from "../../utils/url-API";
import {ILoginCurrentUser, ILoginCurrentUserData} from "../../types/iLoginCurrentUser";
import {AppDispatch, AppThunk} from "../store/typesStore";
import {IlogOutCurrentUser, IlogOutCurrentUserData} from "../../types/ilogOutCurrentUser";


interface IGetLogoutUserRequest {
    readonly type : typeof GET_LOGOUT_USER_REQUEST
}
interface IGetLogoutUserSuccess{
    readonly type : typeof GET_LOGOUT_USER_SUCCESS;
    // readonly payload : IlogOutCurrentUserData
}
interface IGetLogoutUserFailed{
    readonly type : typeof GET_LOGOUT_USER_FAILED;
    readonly payload : string
}

export type TLogOutCurrentUser =
    IGetLogoutUserRequest |
    IGetLogoutUserSuccess |
    IGetLogoutUserFailed;

export const logOutCurrentUser:AppThunk = (i: string) => async (dispatch: AppDispatch) => {
    dispatch({type: GET_LOGOUT_USER_REQUEST});
    try {
        const response = await logOut(i);
        const data = await checkResponse(response);

        if (data.success) {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            dispatch({
                type: GET_LOGOUT_USER_SUCCESS,
                // payload: data
            });
        } else {
            dispatch({
                type: GET_LOGOUT_USER_FAILED,
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: GET_LOGOUT_USER_FAILED,
            payload: 'Ошибка при загрузке данных'
        });
    }
}