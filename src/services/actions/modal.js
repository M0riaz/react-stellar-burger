import {CLOSE_MODAL, OPEN_MODAL} from "./constants/constants";

export const openModal = ( item) => {

    return {
        type: OPEN_MODAL,
        payload: item
    }
};
export const closeModal = () => {

    return {
        type: CLOSE_MODAL,
    }

};