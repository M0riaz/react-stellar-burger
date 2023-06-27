import { itemReducer} from "../reducer/reducer";
import {getItems} from "../reducer/get_items";
import {getOrder} from "../reducer/get_order";
import {modal} from "../reducer/modal";

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    itemReducer,
     getItems,
    getOrder,
    modal,
});

export default rootReducer;