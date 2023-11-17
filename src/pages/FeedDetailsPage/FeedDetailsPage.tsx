import {FeedDetails} from "../FeedDetails/FeedDetails";
// import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import React, {FC} from "react";
import {connectOrdersAll, disconnectOrdersAll} from "../../services/actions/ordersFeedAllAction";
import {wsOrdersFeedAllUrl} from "../../services/store/store";
import {useDispatch, useSelector} from "../../services/store/typesStore";

export const FeedDetailsPage: FC = () => {

    React.useEffect(() => {
        dispatch(connectOrdersAll(wsOrdersFeedAllUrl))
        return () => {
            dispatch(disconnectOrdersAll())
        }

    }, []);

    const orders = useSelector(state => state.ordersFeedAllReducer.orders.orders);
    const dispatch = useDispatch()
    const {id} = useParams();
    // @ts-ignore
    const order = orders?.find((order )=> order.number === +id)
    return (
        <>
            {
                order &&
                <div>
                    <FeedDetails order={order} />
                </div>
            }
        </>
    );
}