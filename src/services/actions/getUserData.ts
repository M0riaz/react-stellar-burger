import {GET_USER_DATA_FAILED, GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS} from "./constants/constants";
import {getUser} from "../../utils/url-API";
import {AppDispatch, AppThunk} from "../store/typesStore";
import {IUserData} from "../../types/iUserData";

interface IGetUserDataRequest {
    readonly type : typeof GET_USER_DATA_REQUEST
}

interface IGetUserDataSuccess {
    readonly type : typeof GET_USER_DATA_SUCCESS;
    readonly payload : IUserData
}
interface IGetUserDataFailed {
    readonly type : typeof GET_USER_DATA_FAILED;
    readonly payload : string;
}

export type TGetUserData =
    IGetUserDataRequest |
    IGetUserDataSuccess |
    IGetUserDataFailed;

export const getUserData: AppThunk = () => async (dispatch: AppDispatch) => {
    dispatch({type: GET_USER_DATA_REQUEST});
    try {
        const data  = await getUser();
        if (data.success) {
            dispatch({
                type: GET_USER_DATA_SUCCESS,
                payload: data
            });
        } else {
            // localStorage.removeItem("accessToken");
            // localStorage.removeItem("refreshToken");
            dispatch({
                type: GET_USER_DATA_FAILED,
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: GET_USER_DATA_FAILED,
            payload: 'Ошибка при загрузке данных'
        });
    }
}