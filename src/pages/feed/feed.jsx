import {Order} from "../../components/Order/Order";
import style from './feed.module.css'

import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import {connectOrdersAll, disconnectOrdersAll} from "../../services/actions/ordersFeedAllAction";
import {wsOrdersFeedAllUrl} from "../../services/store/store";

import {OrderFeedStatistic} from '../../components/OrderFeedStatistic/OrderFeedStatistic'


export const Feed = () => {
    const dispatch = useDispatch();
    const {orders} = useSelector(state => state.ordersFeedAllReducer.orders);

    useEffect(() => {
        dispatch(connectOrdersAll(wsOrdersFeedAllUrl))
        return () => {
            dispatch(disconnectOrdersAll())
        }
    },[])


    return(
            <section className={style.main}>
                <h1 className='text text_type_main-large mt-10 mb-7'>Лента Заказов</h1>
                <div className={style.content}>
                    <div className={`${style.itemBox} mr-15`}>
                        {orders && orders.map((item) => ( <Order item={item} key={item._id}/>)) }
                    </div>
                    <div className={style.statisticBox}>
                        <OrderFeedStatistic  />
                    </div>
                </div>
            </section>
        )
}