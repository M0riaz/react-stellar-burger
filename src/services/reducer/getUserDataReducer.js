// import {GET_USER_DATA_FAILED, GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS} from "../actions/constants/constants";
// import {TGetUserData} from "../actions/getUserData";
// import {isAction} from "@reduxjs/toolkit";
//
// interface IInitialState {
//     email: string,
//     // password: string,
//     name: string,
//     userDataRequest: boolean,
//     userDataFailed: boolean,
//     userDataError: null | string,
//     isAuth : boolean
// }
//
// const initialState = {
//     email: '',
//     // password: '',
//     name: '',
//     userDataRequest: false,
//     userDataFailed: false,
//     userDataError: null,
//     isAuth: true,
// }
//
// export const getUserDataReducer = (state: IInitialState = initialState, action : TGetUserData) => {
//     switch (action.type) {
//         case GET_USER_DATA_REQUEST: {
//
//             return {
//                 ...state,
//                 userDataRequest: true,
//                 userDataFailed: false,
//
//             };
//         }
//         case  GET_USER_DATA_SUCCESS: {
// console.log(state.isAuth)
//             // @ts-ignore
//             // localStorage.getItem("refreshToken", action.payload.refreshToken);
//             return {
//                 ...state,
//                 userDataRequest: false,
//                 name: action.payload.user.name,
//                 email: action.payload.user.email,
//                 // password: action.payload.user.password,
//                 isAuth: true,
//             }
//         }
//         case GET_USER_DATA_FAILED: {
//             return {
//                 ...state,
//                 userDataRequest: false,
//                 userDataFailed: true,
//             };
//         }
//         default: {
//             return state;
//         }
//     }
// }