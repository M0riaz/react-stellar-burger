import style from './OrderFeedStatistic.module.css'
import {useSelector} from "../../services/store/typesStore";
import {IOneOrder} from "../../types/order";
import {FC} from "react";

interface IOrder{
    orders: IOneOrder[],
    total: number,
    totalToday: number
}

export const OrderFeedStatistic: FC = () => {

    const {orders, total, totalToday}:IOrder = useSelector(state => state.ordersFeedAllReducer.orders);

    const doneOrders = orders?.map( (i: IOneOrder) =>  i.status === 'done' ? i.number : null);
    const cookingOrders = orders?.map( (i: IOneOrder) =>  i.status === 'pending' || i.status === 'created' ? i.number : null);

    return (
        <div>
            <div className={style.lists}>
                <div className={`${style.listBox}  mr-9`}>
                    <h2 className={`${style.headers} mb-6 text text_type_main-medium`}>Готовы:</h2>
                    <ul className={`${style.listReady} text text_type_digits-default`}>
                        {
                            doneOrders?.slice(0, 20).map( (i:number|null, index: number )=> <li key={index}>{i}</li>)
                        }
                    </ul>
                </div>
                <div className={style.listBox}>
                    <h2 className={`${style.headers} mb-6 text text_type_main-medium`}>В работе:</h2>
                    <ul className={`${style.list} text text_type_digits-default`}>
                        {
                            cookingOrders?.slice(0, 20).map( (i:number|null, index:number )=> <li key={index}>{i}</li>)
                        }
                    </ul>
                </div>
            </div>
            <div className={`${style.orders} mt-15`}>
                <h2 className={`${style.headers} mb-6 text text_type_main-medium`}>Выполнено за все время:</h2>
                <span className={`${style.digits} text text_type_digits-large`}>{total}</span>
            </div>
            <div className={`${style.orders} mt-15`}>
               <h2 className={`${style.headers} mb-6 text text_type_main-medium`}>Выполнено за сегодня:</h2>
                <span className={`${style.digits} text text_type_digits-large`}>{totalToday}</span>
            </div>
        </div>
    )
}