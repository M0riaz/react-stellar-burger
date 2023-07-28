import React from "react";
import { useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {FeedDetails} from "../FeedDetails/FeedDetails";
import style from './ModalFeed.module.css'

export const ModalFeed = () => {

    const orders = useSelector(state => state.ordersFeedAllReducer.orders.orders);
    const {id} = useParams();

    const order = orders?.find(order => order.number === +id)

    return (
        <>
            {
                order &&
                <div className={style.main}>
                    <FeedDetails order={order}/>
                </div>
            }
        </>
    );
}