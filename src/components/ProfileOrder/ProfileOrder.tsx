import style from './ProfileOrder.module.css'
import React, {FC, useEffect} from "react";
import {Order} from "../Order/Order";
// import {useDispatch} from "react-redux";
import {connectOrdersUser, disconnectOrdersUser} from "../../services/actions/ordersFeedUserAction";
import {useDispatch, useSelector} from "../../services/store/typesStore";
import {IOneOrder} from "../../types/order";

export const ProfileOrder: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken')?.slice(7) : '';
        dispatch(connectOrdersUser(`wss://norma.nomoreparties.space/orders?token=${accessToken}`))
        return () => {
            dispatch(disconnectOrdersUser())
        }
    },[])


    const  orders :Array<IOneOrder> = useSelector((state) => state.orderFeedUserReducer.orders.orders);

    return (
            <section className={`${style.main} ml-15`}>
                {orders?.map((item: IOneOrder) => ( <Order item={item} key={item._id}/>)) }
            </section>
    )
}