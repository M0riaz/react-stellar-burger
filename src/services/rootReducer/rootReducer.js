import { itemReducer} from "../reducer/reducer";
import {getItems} from "../reducer/get_items";
import {getOrder} from "../reducer/get_order";
import {modal} from "../reducer/modal";

import { combineReducers } from 'redux';
import {getPass} from "../reducer/registrationUser";
import {regNewUser} from "../reducer/regNewUser";

import {ordersFeedAllReducer} from "../reducer/ordersFeedAllReducer";
import {orderFeedUserReducer} from "../reducer/ordersFeedUserReducer";


const rootReducer = combineReducers({
    itemReducer,
     getItems,
    getOrder,
    modal,
    getPass,
    regNewUser,
    ordersFeedAllReducer,
    orderFeedUserReducer
});

export default rootReducer;