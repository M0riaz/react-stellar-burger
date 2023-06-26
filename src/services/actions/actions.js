import {
    GET_ITEMS_FAILED,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILED,
    DELETE_INGREDIENT,
    ADD_INGREDIENT,
    ADD_BUN,
    OPEN_MODAL,
    CLOSE_MODAL,

} from "./constants/constants";
import {checkResponse, dataIngredients, dataOrder} from "../../utils/url-API";

export const getItems = () => async (dispatch) => {
    dispatch({type: GET_ITEMS_REQUEST});
    try {
        const response = await dataIngredients();
        const data = await checkResponse(response);
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

export const getOrder = (data) => {

    return function (dispatch) {
        dispatch({
            type: GET_ORDERS_REQUEST
        });
        dataOrder(data)
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(response => {
                            dispatch({
                                type: GET_ORDERS_SUCCESS,
                                payload: response.order.number
                            })
                        }
                    )
                } else {
                    dispatch({
                        type: GET_ORDERS_FAILED,
                        payload: 'Ошибка при загрузке данных'
                    });
                }
            }).catch(err => {
            dispatch({
                type: GET_ORDERS_FAILED,
                payload: 'Ошибка при загрузке данных'
            })
        })
    };
}


export const addIngredient = (dispatch, ingredient) => {
    dispatch({
        type: ADD_INGREDIENT,
        payload: ingredient
    })
}

export const deleteIngredientById = (dispatch, ingredientId) => {
    dispatch({
        type: DELETE_INGREDIENT,
        payload: ingredientId
    })
}

export const addBun = (dispatch, bun) => {
    dispatch({
        type: ADD_BUN,
        payload: bun
    })
}
export const openModal = (dispatch, item) => {

    dispatch({
        type: OPEN_MODAL,
        payload: item
    })
};
export const closeModal = (dispatch) => {

    dispatch({
        type: CLOSE_MODAL,
    })
};

export const updateItem = (dispatch, item) => {
    dispatch({
        type: 'UPDATE_ITEM',
        payload: item
    })
}
export const removeBun = (dispatch) => {
    dispatch({
        type: 'REMOVE_BUN',

    })
}
