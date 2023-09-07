import {Order} from "../../components/Order/Order";
import style from './feed.module.css'
import { useDispatch } from "react-redux";
import {useSelector} from '../../services/store/typesStore'
import {FC, useEffect} from "react";
import {connectOrdersAll, disconnectOrdersAll} from "../../services/actions/ordersFeedAllAction";
import {wsOrdersFeedAllUrl} from "../../services/store/store";
import {OrderFeedStatistic} from '../../components/OrderFeedStatistic/OrderFeedStatistic'
import {RootState} from "../../services/store/typesStore";
import {IOneOrder} from "../../types/FeedOrders";

export const Feed:FC = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const {orders} = useSelector((state: RootState )=> state.ordersFeedAllReducer.orders);


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
                        {orders?.map((item: IOneOrder, index: number) => ( <Order item={item} key={index}/>)) }
                    </div>
                    <div className={style.statisticBox}>
                        <OrderFeedStatistic/>
                    </div>
                </div>
            </section>
        )
}