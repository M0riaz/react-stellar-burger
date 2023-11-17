import React, {FC} from "react";
// import { useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {FeedDetails} from "../FeedDetails/FeedDetails";
import style from './ModalFeed.module.css'
import {useSelector} from "../../services/store/typesStore";

export const ModalFeed: FC = () => {
    const orders = useSelector(state => state.ordersFeedAllReducer.orders.orders);
    const {id} = useParams();
    // @ts-ignore
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