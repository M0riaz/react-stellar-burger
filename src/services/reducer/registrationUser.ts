import {GET_PASS_REQUEST, GET_PASS_SUCCESS, GET_PASS_FAILED,GET_NEW_PASSWORD_SUCCESS,
    GET_NEW_PASSWORD_FAILED,GET_NEW_PASSWORD_REQUEST
} from "../actions/constants/constants";
import {TResetPass} from "../actions/resetPass";
import {TGetPass} from "../actions/getPass";
import {IPassRequest} from "../../types/iPassRequest";

type TPassword = TResetPass | TGetPass;

interface IRegUserState {
    email: string,
    token: string,
    password: string,

    passRequest: boolean,
    passFailed: boolean,
    passError: null | string,

    newPassRequest: boolean,
    newPassFailed: boolean,
    newPassError: null | string,
}


const initialState:IRegUserState = {
    email: '',
    token: '',
   password: '',
    passRequest: false,
    passFailed: false,
    passError: null,

    newPassRequest: false,
    newPassFailed: false,
    newPassError: null,

}
export const getPass =  (state : IRegUserState = initialState, action: TPassword) => {
    switch (action.type) {

        case GET_PASS_REQUEST: {
            return {
                ...state,
                passRequest: true,
                passFailed: false
            };
        }
        case  GET_PASS_SUCCESS: {
            return {
                ...state,
                // email: action.payload,
                passRequest: false

            }
        }
        case GET_PASS_FAILED: {
            return {
                ...state,
                passFailed: true,
                passRequest: false,
                passError: action.payload
            };
        }

        case GET_NEW_PASSWORD_REQUEST: {
            return {
                ...state,
                newPassRequest: true,
                newPassFailed: false
            };
        }
        case  GET_NEW_PASSWORD_SUCCESS: {
            return {
                ...state,
                // password: action.payload,
                // token: action.payload,
                newPassRequest: false

            }
        }
        case GET_NEW_PASSWORD_FAILED: {
            return {
                ...state,
                newPassFailed: true,
                newPassRequest: false,
                newPassError: action.payload
            };
        }

        default: {
            return state;
        }

    }
}
