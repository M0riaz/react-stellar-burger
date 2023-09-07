import {GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS} from "./constants/constants";
import {checkResponse, dataIngredients} from "../../utils/url-API";
import {AppDispatch, AppThunk} from "../store/typesStore";
import {IItemsResponse} from "../../types/itemsResponse";
import {IIngredient} from "../../types/ingridient";

interface IGetItemsRequest {
    readonly type: typeof GET_ITEMS_REQUEST
}
interface IGetItemSuccess {
    readonly type: typeof GET_ITEMS_SUCCESS;
    readonly payload : IIngredient[]
}

interface IGetItemFailed {
    readonly type: typeof GET_ITEMS_FAILED;
    readonly payload: string
}


export type TItemsRequest =
    IGetItemsRequest |
    IGetItemSuccess |
    IGetItemFailed;

export const getItems: AppThunk = () => async (dispatch: AppDispatch) => {

    dispatch({type: GET_ITEMS_REQUEST});
    try {
        const response = await dataIngredients();
        const data: IItemsResponse = await checkResponse(response);
        if (data.success) {
            dispatch({
                type: GET_ITEMS_SUCCESS,
                payload: data.data
            });
        } else {
            dispatch({
                type: GET_ITEMS_FAILED,
                payload: 'Ошибка при загрузке данных'
            });
        }
    } catch (error) {
        dispatch({
            type: GET_ITEMS_FAILED,
            payload: 'Ошибка при загрузке данных'
        });
    }
};