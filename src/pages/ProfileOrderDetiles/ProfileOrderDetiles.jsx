import {FeedDetails} from "../FeedDetails/FeedDetails";
import {wsOrdersFeedUserUrl} from "../../services/store/store";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {connectOrdersUser, disconnectOrdersUser} from "../../services/actions/ordersFeedUserAction";
import React, {useEffect} from "react";

export const ProfileOrderDetiles = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orderFeedUserReducer.orders.orders);
    const {id} = useParams();
    const order = orders?.find(order => order.number === +id)

    useEffect(() => {
        dispatch(connectOrdersUser(wsOrdersFeedUserUrl))
        return () => {
            dispatch(disconnectOrdersUser())
        }
    }, [])
    return (
        <>
            {
                order &&
                <div>
                    <FeedDetails order={order}/>
                </div>
            }
        </>
    );
}

