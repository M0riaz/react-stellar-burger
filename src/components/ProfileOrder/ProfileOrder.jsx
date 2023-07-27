import style from './ProfileOrder.module.css'
import React, {useEffect} from "react";
import {Order} from "../Order/Order";
import {useDispatch, useSelector} from "react-redux";
import {connectOrdersUser, disconnectOrdersUser} from "../../services/actions/ordersFeedUserAction";



export const ProfileOrder = () => {
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken').slice(7) : '';
    useEffect(() => {
        dispatch(connectOrdersUser(`wss://norma.nomoreparties.space/orders?token=${accessToken}`))
        return () => {
            dispatch(disconnectOrdersUser())
        }
    },[])

    const orders = useSelector(state => state.orderFeedUserReducer.orders.orders);
    return (
            <section className={`${style.main} ml-15`}>

                {orders?.map((item) => ( <Order item={item} key={item._id}/>)) }
            </section>
    )
}