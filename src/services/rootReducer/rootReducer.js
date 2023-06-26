import {
     itemReducer
} from "../reducer/reducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    itemReducer,

});

export default rootReducer;