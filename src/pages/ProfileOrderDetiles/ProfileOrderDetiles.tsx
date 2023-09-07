import {FeedDetails} from "../FeedDetails/FeedDetails";
import {wsOrdersFeedUserUrl} from "../../services/store/store";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {connectOrdersUser, disconnectOrdersUser} from "../../services/actions/ordersFeedUserAction";
import React, {useEffect} from "react";
import {useSelector} from "../../services/store/typesStore";

export const ProfileOrderDetiles = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const {orders} = useSelector(state => state.orderFeedUserReducer.orders);
    const {id} = useParams();
    // @ts-ignore
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

