import {GET_REG_NEW_USER_SUCCESS, GET_REG_NEW_USER_FAILED,GET_REG_NEW_USER_REQUEST,
    GET_LOGIN_USER_SUCCESS, GET_LOGIN_USER_FAILED, GET_LOGIN_USER_REQUEST,
    GET_LOGOUT_USER_REQUEST,GET_LOGOUT_USER_SUCCESS,GET_LOGOUT_USER_FAILED,
    // GET_REFRESH_TOKEN_FAILED, GET_REFRESH_TOKEN_REQUEST, GET_REFRESH_TOKEN_SUCCESS,
    GET_USER_DATA_FAILED, GET_USER_DATA_SUCCESS, GET_USER_DATA_REQUEST,
    GET_UPDATE_USER_FAILED, GET_UPDATE_USER_REQUEST, GET_UPDATE_USER_SUCCESS
} from "../actions/constants/constants";
import {TRegNewUser} from "../actions/regestrationUser";
import {TLogOutCurrentUser} from "../actions/logOutCurrentUser";
import {TLoginCurrentUser} from "../actions/loginCurrentUser";
import {TGetUserData} from "../actions/getUserData";
import {TUpdateUserData} from "../actions/updateUserData";

type Types = TRegNewUser
    | TLogOutCurrentUser
    | TLoginCurrentUser
    | TGetUserData
    | TUpdateUserData

interface IStateState {
    email: string,
    password: string,
    name: string,

    newUserRequest: boolean,
    newUserFailed: boolean,
    newUserError: null |string,

    loginRequest: boolean,
    loginFailed: boolean,
    loginError: null | string,
    isAuth: boolean,


    logOutRequest: boolean,
    logOutFailed: boolean,
    logOutError: null | string,

    refreshToken: null | string,
    accessToken: null | string,

    userDataRequest: boolean,
    userDataFailed: boolean,
    userDataError: null | string,

    updateUserRequest: boolean,
    updateUserFailed: boolean,
    updateUserError: string| null,
}

const initialState:IStateState = {
    email: '',
    password: '',
    name: '',

    newUserRequest: false,
    newUserFailed: false,
    newUserError: null,

    loginRequest: false,
    loginFailed: false,
    loginError: null,
    isAuth: false,


    logOutRequest: false,
    logOutFailed: false,
    logOutError: null,

    refreshToken: null,
    accessToken: null,

    // tokenRequest: false,
    // tokenFailed: false,
    // tokenError: null,

    userDataRequest: false,
    userDataFailed: false,
    userDataError: null,

    updateUserRequest: false,
    updateUserFailed: false,
    updateUserError: null,

}


export const regNewUser = (state:IStateState = initialState, action: Types) => {
    switch (action.type) {

        case GET_REG_NEW_USER_REQUEST: {
            return {
                ...state,
                newUserRequest: true,
                newUserFailed: false
            };
        }
        case  GET_REG_NEW_USER_SUCCESS: {
            return {
                ...state,
                accessToken: action.payload,
                refreshToken:action.payload,
                email: action.payload.user.email,
                password: action.payload.user.password,
                name: action.payload.user.name,
                newUserRequest: false,
                isAuth: true,
            }
        }
        case GET_REG_NEW_USER_FAILED: {
            return {
                ...state,
                newUserFailed: true,
                newUserRequest: false,
                newUserError: action.payload
            };
        }
        case GET_LOGIN_USER_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false
            };
        }
        case  GET_LOGIN_USER_SUCCESS: {
            console.log('GET_LOGIN_USER_SUCCESS')
            return {
                ...state,
                accessToken: action.payload,
                refreshToken:action.payload,
                loginFailed: false,
                loginRequest: false,
                isAuth: true,
                email: action.payload.user.email,
                password: action.payload.user.password,
                name: action.payload.user.name,
            }
        }
        case GET_LOGIN_USER_FAILED: {

            return {
                ...state,
                loginFailed: true,
                loginRequest: false,
                loginError: action.payload,
                // isAuth: false,
            };
        }
        case GET_LOGOUT_USER_REQUEST: {
            return {
                ...state,
                logOutRequest: true,
                logOutFailed: false
            };
        }
        case  GET_LOGOUT_USER_SUCCESS: {
            return {
                ...state,
                email: '',
               password:'',
                name: '',
                isAuth: false,
                logOutRequest: false
            }
        }
        case GET_LOGOUT_USER_FAILED: {
            return {
                ...state,
                logOutFailed: true,
                logOutRequest: false,
                logOutError: action.payload
            };
        }

        // case GET_REFRESH_TOKEN_REQUEST: {
        //     return {
        //         ...state,
        //         tokenRequest: true,
        //         tokenFailed: false,
        //     }
        // }
        // case GET_REFRESH_TOKEN_SUCCESS: {
        //     // localStorage.setItem("refreshToken", action.payload.refreshToken);
        //     // localStorage.setItem("accessToken", action.payload.accessToken);
        //     return {
        //         ...state,
        //        // refreshToken: action.payload.refreshToken,
        //        //  accessToken: action.payload.accessToken,
        //         tokenRequest: true,
        //     }
        // }
        // case GET_REFRESH_TOKEN_FAILED: {
        //     return {
        //         ...state,
        //         tokenRequest: false,
        //         tokenFailed: true,
        //         // refreshToken: action.payload.refreshToken,
        //     }
        // }

        case GET_USER_DATA_REQUEST: {

            return {
                ...state,
                userDataRequest: true,
                userDataFailed: false,

                // tokenRequest: true,
                // tokenFailed: false,
            };
        }
        case  GET_USER_DATA_SUCCESS: {
            // console.log('GET_USER_DATA_SUCCESS')
            // localStorage.getItem("refreshToken", action.payload.refreshToken);
            return {
                ...state,
                userDataRequest: false,
                name: action.payload.user.name,
                email: action.payload.user.email,
                password: action.payload.user.password,
                isAuth: true,
                // refreshToken: action.payload.refreshToken,
                // accessToken: action.payload.accessToken,
                // tokenRequest: true,
            }
        }
        case GET_USER_DATA_FAILED: {
            return {
                ...state,
                userDataRequest: false,
                userDataFailed: true,
                // tokenRequest: false,
                // tokenFailed: true,
            };
        }
        case GET_UPDATE_USER_REQUEST: {

            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: false,
            };
        }
        case  GET_UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserRequest: false,
                name: action.payload.user.name,
                password: action.payload.user.password,
                email: action.payload.user.email
            }
        }
        case GET_UPDATE_USER_FAILED: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: true,
            };
        }
        default: {
            return state;
        }

    }
}
