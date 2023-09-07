import {GET_UPDATE_USER_FAILED, GET_UPDATE_USER_REQUEST, GET_UPDATE_USER_SUCCESS} from "./constants/constants";
import {updateUserInfo} from "../../utils/url-API";
import {IUpdateUser, IUpdateUserData} from "../../types/IUpdateUser";
import {AppDispatch, AppThunk} from "../store/typesStore";

interface IGetUpdateUserRequest {
    readonly type : typeof GET_UPDATE_USER_REQUEST
}
interface IGetUpdateUserSuccess {
    readonly type : typeof GET_UPDATE_USER_SUCCESS
    readonly payload : IUpdateUserData
}
interface IGetUpdateUserFailed {
    readonly type : typeof GET_UPDATE_USER_FAILED
    readonly payload : string
}

export type TUpdateUserData =
    IGetUpdateUserRequest |
    IGetUpdateUserSuccess |
    IGetUpdateUserFailed

export const updateUserData : AppThunk = (info: IUpdateUser) => async (dispatch: AppDispatch) => {
    dispatch({type: GET_UPDATE_USER_REQUEST});
    try {
        // const response = await updateUserInfo(info);
        // const data = await checkResponse(response);
        const data = await updateUserInfo(info);
        if (data.success) {
            dispatch({
                type: GET_UPDATE_USER_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: GET_UPDATE_USER_FAILED,
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: GET_UPDATE_USER_FAILED,
            payload: 'Ошибка при загрузке данных'
        });
    }
}