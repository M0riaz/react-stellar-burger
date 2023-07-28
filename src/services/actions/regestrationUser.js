import {
    checkResponse,
    loginUser,
    logOut,
    recoveryPassword,
    registerNewUser,
    resetPassword,
    refreshToken, getUser, updateUserInfo, rerefreshToken
} from "../../utils/url-API";

//отправка эл. почты для получения кода-токена
export const getPass = (Q) => async (dispatch) => {
    dispatch({type: 'GET_PASS_REQUEST'});
    try {
        const response = await recoveryPassword(Q);
        const data = await checkResponse(response);
        if (data.success) {
            dispatch({
                type: 'GET_PASS_SUCCESS',
                payload: data.data
            });
        } else {
            dispatch({
                type: 'GET_PASS_FAILED',
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: 'GET_PASS_FAILED',
            payload: 'Ошибка при загрузке данных'
        });
    }
}

export const regNewUser = (i) => async (dispatch) => {
    dispatch({type: 'GET_REG_NEW_USER_REQUEST'});
    try {
        const response = await registerNewUser(i);
        const data = await checkResponse(response);

        if (data.success) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            dispatch({
                type: 'GET_REG_NEW_USER_SUCCESS',
                payload: data
            });
        } else {
            dispatch({
                type: 'GET_REG_NEW_USER_FAILED',
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: 'GET_REG_NEW_USER_FAILED',
            payload: 'Ошибка при загрузке данных'
        });
    }
}

export const resetPass  = (i) => async (dispatch) => {
    console.log(i)
    dispatch({type: 'GET_NEW_PASSWORD_REQUEST'});
    try {
        const response = await  resetPassword(i);
        const data = await checkResponse(response);

        if (data.success) {
            dispatch({
                type: 'GET_NEW_PASSWORD_SUCCESS',
                payload: data
            });
        } else {
            dispatch({
                type: 'GET_NEW_PASSWORD_FAILED',
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: 'GET_NEW_PASSWORD_FAILED',
            payload: 'Ошибка при загрузке данных'
        });
    }
}


export const refreshCurrentToken = (q) => async (dispatch) => {
    console.log(q,'sss')
    dispatch({type: 'GET_REFRESH_TOKEN_REQUEST'});
    try {
        const response = await refreshToken(q);
        const data = await checkResponse(response);
         if (localStorage.getItem("accessToken")) {
            dispatch({
                type: 'GET_REFRESH_TOKEN_SUCCESS',
                payload: data
            });
        } else {
            dispatch({
                type: 'GET_REFRESH_TOKEN_FAILED',
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: 'GET_REFRESH_TOKEN_FAILED',
            payload: 'Ошибка при загрузке данных'
        });
    }
}

export const loginCurrentUser = (i) => async (dispatch) => {
    dispatch({type: 'GET_LOGIN_USER_REQUEST'});
    try {
        const response = await loginUser(i);
        const data = await checkResponse(response);
        if (data.success) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            dispatch({
                type: 'GET_LOGIN_USER_SUCCESS',
                payload: data
            });
        } else {
            dispatch({
                type: 'GET_LOGIN_USER_FAILED',
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: 'GET_LOGIN_USER_FAILED',
            payload: 'Ошибка при загрузке данных'
        });
    }
}


export const logOutCurrentUser = (i) => async (dispatch) => {

    dispatch({type: 'GET_LOGOUT_USER_REQUEST'});
    try {
        const response = await logOut(i);
        const data = await checkResponse(response);

        if (data.success) {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            dispatch({
                type: 'GET_LOGOUT_USER_SUCCESS',
                payload: data
            });
        } else {
            dispatch({
                type: 'GET_LOGOUT_USER_FAILED',
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: 'GET_LOGOUT_USER_FAILED',
            payload: 'Ошибка при загрузке данных'
        });
    }
}

export const getUserData = () => async (dispatch) => {
    dispatch({type: 'GET_USER_DATA_REQUEST'});
    try{
        const data = await getUser();
        if (data.success) {
            dispatch({
                type: 'GET_USER_DATA_SUCCESS',
                payload: data
            });
        } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch({
                type: 'GET_USER_DATA_FAILED',
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: 'GET_USER_DATA_FAILED',
            payload: 'Ошибка при загрузке данных'
        });
    }
}

export const updateUserData = (info) => async (dispatch) => {
    dispatch({type: 'GET_UPDATE_USER_REQUEST'});
    try {
        const response = await updateUserInfo(info);
        const data = await checkResponse(response);
        if (data.success) {
            dispatch({
                type: 'GET_UPDATE_USER_SUCCESS',
                payload: data
            });
        } else {
            dispatch({
                type: 'GET_UPDATE_USER_FAILED',
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: 'GET_UPDATE_USER_FAILED',
            payload: 'Ошибка при загрузке данных'
        });
    }
}



