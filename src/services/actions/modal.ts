import {CLOSE_MODAL, OPEN_MODAL} from "./constants/constants";
import {IIngredient} from "../../types/ingridient";

export interface IOpenModal<T> {
    readonly type: typeof OPEN_MODAL;
    readonly payload: T
}

export interface ICloseModal{
    readonly type: typeof CLOSE_MODAL
}
export type TModal<T> =
    IOpenModal<T> |
    ICloseModal

export const openModal = <T>(item: T): IOpenModal<T> => {
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