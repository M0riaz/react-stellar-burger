import {FeedDetails} from "../FeedDetails/FeedDetails";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import React from "react";
import {connectOrdersAll, disconnectOrdersAll} from "../../services/actions/ordersFeedAllAction";
import {wsOrdersFeedAllUrl} from "../../services/store/store";

export const FeedDetailsPage = () => {

    React.useEffect(() => {
        dispatch(connectOrdersAll(wsOrdersFeedAllUrl))
        return () => {
            dispatch(disconnectOrdersAll())
        }

    }, []);

    const orders = useSelector(state => state.ordersFeedAllReducer.orders.orders);
    const dispatch = useDispatch()
    const {id} = useParams();
    const order = orders?.find(order => order.number === +id)


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