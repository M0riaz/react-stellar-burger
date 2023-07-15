import {CLOSE_MODAL, OPEN_MODAL} from "../actions/constants/constants";

const initialState = {
    item: {},
    ingredientData: {}
}
export const modal = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                item: action.payload

            };
        }

        case CLOSE_MODAL: {
            return {
                ...state,
                ingredientData: {}
            };
        }
        default: {
            return state;
        }
    }
}