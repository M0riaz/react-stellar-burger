import {TIngredientControl} from "../actions/actions";
import { Action, ActionCreator } from 'redux';
import {TModal} from "../actions/modal";
import {TItemsRequest} from "../actions/get_items";
import {TOrdersRequest} from "../actions/get_order";
import {TOrdersFeedAll} from "../actions/ordersFeedAllAction";
import {TOrdersFeedUser} from "../actions/ordersFeedUserAction";
import {TGetPass} from "../actions/getPass";
import {TGetUserData} from "../actions/getUserData";
import {TLoginCurrentUser} from "../actions/loginCurrentUser";
import {TLogOutCurrentUser} from "../actions/logOutCurrentUser";
import {TRegNewUser} from "../actions/regestrationUser";
import {TResetPass} from "../actions/resetPass";
import {TUpdateUserData} from "../actions/updateUserData";
import type {} from "redux-thunk/extend-redux";
import {rootReducer} from "./store";
import { ThunkAction } from "@reduxjs/toolkit";
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";

export type RootState = ReturnType<typeof rootReducer.getState>;

export type TActions =
    TIngredientControl |
    TModal |
    TItemsRequest |
    TOrdersRequest |
    TOrdersFeedAll |
    TOrdersFeedUser |
    TGetPass |
    TGetUserData |
    TLoginCurrentUser |
    TLogOutCurrentUser |
    TRegNewUser |
    TResetPass |
    TUpdateUserData;

export type AppDispatch = typeof rootReducer.dispatch;

export type AppThunk<TReturn = void> =
    ActionCreator<ThunkAction<TReturn, Action, RootState, TActions>>;

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
