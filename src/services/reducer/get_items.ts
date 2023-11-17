import {GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS} from "../actions/constants/constants";
import {IIngredient} from "../../types/ingridient";
import {TItemsRequest} from "../actions/get_items";

interface IInitialState {
    items: Array<IIngredient> ;
    itemsRequest: boolean,
    itemsFailed: boolean,
    itemsError: null | string,

}

const initialState :IInitialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
    itemsError: null,
}
export const getItems =  (state: IInitialState = initialState, action: TItemsRequest) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST: {
            return {
                ...state,
                itemsRequest: true,
                itemsFailed: false
            };
        }
        case  GET_ITEMS_SUCCESS: {
            return {
                ...state,
                items: action.payload,
                itemsRequest: false
            }
        }
        case GET_ITEMS_FAILED: {
            return {
                ...state,
                itemsFailed: true,
                itemsRequest: false,
                itemsError: action.payload
            };
        }
        default: {
            return state;
        }

    }
}