import {checkResponse, refreshToken, registerNewUser} from "../../utils/url-API";

import {
    GET_REG_NEW_USER_FAILED,
    GET_REG_NEW_USER_REQUEST,
    GET_REG_NEW_USER_SUCCESS
} from "./constants/constants";
import {IRegNewUser} from "../../types/IregNewUser";
import {AppDispatch, AppThunk} from "../store/typesStore";
import {ILoginCurrentUserData} from "../../types/iLoginCurrentUser";


interface IGetRegNewUserRequest {
    readonly type : typeof GET_REG_NEW_USER_REQUEST
}

interface IGetRegNewUserSuccess {
    readonly type : typeof GET_REG_NEW_USER_SUCCESS
    readonly payload : ILoginCurrentUserData
}
interface IGetRegNewUserFailed {
    readonly type : typeof GET_REG_NEW_USER_FAILED
    readonly payload : string
}


export type TRegNewUser =
    IGetRegNewUserRequest |
    IGetRegNewUserSuccess |
    IGetRegNewUserFailed;

export const regNewUser:AppThunk = (i: IRegNewUser) => async (dispatch :AppDispatch) => {
    dispatch({type: GET_REG_NEW_USER_REQUEST});
    try {
        const response = await registerNewUser(i);
        const data = await checkResponse(response);

        if (data.success) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            dispatch({
                type: GET_REG_NEW_USER_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: GET_REG_NEW_USER_FAILED,
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: GET_REG_NEW_USER_FAILED,
            payload: 'Ошибка при загрузке данных'
        });
    }
}


// export const refreshCurrentToken = (q) => async (dispatch) => {
//     console.log(q,'sss')
//     dispatch({type: 'GET_REFRESH_TOKEN_REQUEST'});
//     try {
//         const response = await refreshToken(q);
//         const data = await checkResponse(response);
//          if (localStorage.getItem("accessToken")) {
//             dispatch({
//                 type: 'GET_REFRESH_TOKEN_SUCCESS',
//                 payload: data
//             });
//         } else {
//             dispatch({
//                 type: 'GET_REFRESH_TOKEN_FAILED',
//                 payload: 'Ошибка при загрузке данных'
//             });
//         }
//     } catch (error) {
//         console.log(error)
//         dispatch({
//             type: 'GET_REFRESH_TOKEN_FAILED',
//             payload: 'Ошибка при загрузке данных'
//         });
//     }
// }



