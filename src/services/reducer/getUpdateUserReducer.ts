import {GET_UPDATE_USER_FAILED, GET_UPDATE_USER_REQUEST, GET_UPDATE_USER_SUCCESS} from "../actions/constants/constants";
import {TUpdateUserData} from "../actions/updateUserData";

interface IInitialState {
    email: string,
    password: string,
    name: string,
    updateUserRequest: boolean,
    updateUserFailed: boolean,
    updateUserError: null |string,
}

const initialState:IInitialState = {
    email: '',
    password: '',
    name: '',
    updateUserRequest: false,
    updateUserFailed: false,
    updateUserError: null,

}

// export const getUpdateUserReducer = (state: IInitialState = initialState, action: TUpdateUserData) => {
//     switch (action.type) {
//         case GET_UPDATE_USER_REQUEST: {
//
//             return {
//                 ...state,
//                 updateUserRequest: true,
//                 updateUserFailed: false,
//             };
//         }
//         case  GET_UPDATE_USER_SUCCESS: {
//             return {
//                 ...state,
//                 updateUserRequest: false,
//                 name: action.payload,
//                 password: action.payload,
//                 email: action.payload
//             }
//         }
//         case GET_UPDATE_USER_FAILED: {
//             return {
//                 ...state,
//                 updateUserRequest: false,
//                 updateUserFailed: true,
//             };
//         }
//         default: {
//             return state;
//         }
//     }
// }