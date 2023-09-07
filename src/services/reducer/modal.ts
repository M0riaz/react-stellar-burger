import {CLOSE_MODAL, OPEN_MODAL} from "../actions/constants/constants";
import {IIngredient} from "../../types/ingridient";
import {TModal} from "../actions/modal";

interface IModalState {
    item: IIngredient | null,
    // ingredientData: any
}

const initialState: IModalState = {
    item: null
    // ingredientData: {}
}
export const modal = (state : IModalState = initialState, action: TModal) => {
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
                // ingredientData: {}
            };
        }
        default: {
            return state;
        }
    }
}