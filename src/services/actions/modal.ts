import {CLOSE_MODAL, OPEN_MODAL} from "./constants/constants";
import {IIngredient} from "../../types/ingridient";

export interface IOpenModal {
    readonly type: typeof OPEN_MODAL;
    readonly payload: IIngredient
}

export interface ICloseModal{
    readonly type: typeof CLOSE_MODAL
}
export type TModal =
    IOpenModal |
    ICloseModal

export const openModal = (item: IIngredient): IOpenModal => {
    return {
        type: OPEN_MODAL,
        payload: item
    }
};
export const closeModal = () :ICloseModal=> {
    return {
        type: CLOSE_MODAL,
    }
};