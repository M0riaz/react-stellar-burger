import {CLOSE_MODAL, OPEN_MODAL} from "../actions/constants/constants";
import {IIngredient} from "../../types/ingridient";
import {TModal} from "../actions/modal";

interface IModalState<T> {
    item: T | null,
    modalOpen: boolean,
    // ingredientData: any
}

const initialState: IModalState<any> = {
    item: null,
    modalOpen: false,
    // ingredientData: {}
}
export const modal = <T>(state : IModalState<T> = initialState, action: TModal<T>) => {
    switch (action.type) {
        case OPEN_MODAL: {
            const item = action.payload;
            localStorage.setItem("modalItem", JSON.stringify(item))
            return {
                ...state,
                modalOpen: true,
                item: action.payload

            };
        }

        case CLOSE_MODAL: {
            localStorage.removeItem("modalItem");
            return {
                ...state,
                modalOpen: false,
                item: null
                // ingredientData: {}
            };
        }
        default: {
            return state;
        }
    }
}