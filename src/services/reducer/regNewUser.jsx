const initialState = {
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

    tokenRequest: false,
    tokenFailed: false,
    tokenError: null,

    userDataRequest: false,
    userDataFailed: false,
    userDataError: null,

    updateUserRequest: false,
    updateUserFailed: false,
    updateUserError: null,

}


export const regNewUser = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_REG_NEW_USER_REQUEST': {
            return {
                ...state,
                newUserRequest: true,
                newUserFailed: false
            };
        }
        case  'GET_REG_NEW_USER_SUCCESS': {
            return {
                ...state,
                email: action.payload.user.email,
                password: action.payload.user.password,
                name: action.payload.user.name,
                newUserRequest: false,
                isAuth: true,
            }
        }
        case 'GET_REG_NEW_USER_FAILED': {
            return {
                ...state,
                newUserFailed: true,
                newUserRequest: false,
                newUserError: action.payload
            };
        }
        case 'GET_LOGIN_USER_REQUEST': {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false
            };
        }
        case  'GET_LOGIN_USER_SUCCESS': {
            return {
                ...state,
                loginFailed: false,
                loginRequest: false,
                isAuth: true,
                email: action.payload.user.email,
                password: action.payload.user.password,
                name: action.payload.user.name,
            }
        }
        case 'GET_LOGIN_USER_FAILED': {

            return {
                ...state,
                loginFailed: true,
                loginRequest: false,
                loginError: action.payload,
                isAuth: false,
            };
        }
        case 'GET_LOGOUT_USER_REQUEST': {
            return {
                ...state,
                logOutRequest: true,
                logOutFailed: false
            };
        }
        case  'GET_LOGOUT_USER_SUCCESS': {
            return {
                ...state,
                email: '',
               password:'',
                name: '',
                isAuth: false,
                logOutRequest: false
            }
        }
        case 'GET_LOGOUT_USER_FAILED': {
            return {
                ...state,
                logOutFailed: true,
                logOutRequest: false,
                logOutError: action.payload
            };
        }

        case 'GET_REFRESH_TOKEN_REQUEST': {
            return {
                ...state,
                tokenRequest: true,
                tokenFailed: false,
            }
        }
        case 'GET_REFRESH_TOKEN_SUCCESS': {
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            localStorage.setItem("accessToken", action.payload.accessToken);
            return {
                ...state,
               refreshToken: action.payload.refreshToken,
                accessToken: action.payload.accessToken,
                tokenRequest: true,
            }
        }

        case 'GET_REFRESH_TOKEN_FAILED': {
            return {
                ...state,
                tokenRequest: false,
                tokenFailed: true,
                refreshToken: action.payload.refreshToken,
            }
        }

        case 'GET_USER_DATA_REQUEST': {

            return {
                ...state,
                userDataRequest: true,
                userDataFailed: false,
            };
        }
        case  'GET_USER_DATA_SUCCESS': {
            localStorage.getItem("refreshToken", action.payload.refreshToken);
            return {
                ...state,
                userDataRequest: false,
                name: action.payload.user.name,
                email: action.payload.user.email,
                password: action.payload.password,
                isAuth: true,
            }
        }
        case 'GET_USER_DATA_FAILED': {
            return {
                ...state,
                userDataRequest: false,
                userDataFailed: true,
            };
        }
        case 'GET_UPDATE_USER__REQUEST': {

            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: false,
            };
        }
        case  'GET_UPDATE_USER_SUCCESS': {
            return {
                ...state,
                updateUserRequest: false,
                name: action.payload.user.name,
                password: action.payload.user.password,
                email: action.payload.email
            }
        }
        case 'GET_UPDATE_USER_FAILED': {
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
