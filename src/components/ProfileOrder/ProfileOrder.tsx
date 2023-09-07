import style from './ProfileOrder.module.css'
import React, {FC, useEffect} from "react";
import {Order} from "../Order/Order";
import {useDispatch} from "react-redux";
import {connectOrdersUser, disconnectOrdersUser} from "../../services/actions/ordersFeedUserAction";
import {useSelector} from "../../services/store/typesStore";
import {IOrderFromList} from "../../types/order";



export const ProfileOrder = () => {
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken')?.slice(7) : '';
    useEffect(() => {
        dispatch(connectOrdersUser(`wss://norma.nomoreparties.space/orders?token=${accessToken}`))
        return () => {
            dispatch(disconnectOrdersUser())
        }
    },[])

    // @ts-ignore
    const orders = useSelector((state) => state.orderFeedUserReducer.orders.orders);

    return (
            <section className={`${style.main} ml-15`}>
                {orders?.map((item: IOrderFromList) => ( <Order item={item} key={item._id}/>)) }
            </section>
    )
}