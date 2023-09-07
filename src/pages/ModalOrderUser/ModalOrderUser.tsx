import React, {FC} from "react";
import {useParams} from "react-router-dom";
import {FeedDetails} from "../FeedDetails/FeedDetails";
import style from './ModalOrderUser.module.css'
import {useSelector} from "../../services/store/typesStore";

export const ModalOrderUser: FC = () => {

    // @ts-ignore
    const orders = useSelector(state => state.orderFeedUserReducer.orders.orders);
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