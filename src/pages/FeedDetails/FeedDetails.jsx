import style from './FeedDetails.module.css'
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components'
import {FeedDetailsIngridient} from '../../components/FeedDetailsIndridient/FeedDetailsIngridient'
import {useDispatch, useSelector} from "react-redux";
import React from "react";


export const FeedDetails = (props) => {
    const {order} = props;
    const items = useSelector(state => state.getItems.items);

    const element = order.ingredients.map(id => {
        return items.find(i => i._id === id)
    })

    const orderStatus = () =>
        order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : 'Выполнен'

    const orderStatusDone = order.status === 'done';

    const bunCount = element.filter(el => el.type === 'bun').length;
    const countedElements = element.reduce((acc, el) => {
        const found = acc.find(({item}) => item._id === el._id);
        if (found) {
            found.count++;
        } else {
            const isSingleBun = el.type === 'bun' && bunCount === 1;
            acc.push({item: el, count: isSingleBun ? 2 : 1});
        }
        return acc;
    }, []);

    const totalCost = countedElements.reduce((total, {item, count}) => {
        return total + (item ? item.price * count : 0);
    }, 0);

    return (
        <>
            {
                order &&
                <section className={`${style.main} mt-15`}>
                    <h1 className={`${style.number} text text_type_digits-default`}>#{order.number}</h1>
                    <p className={`${style.name} text text_type_main-medium mt-10`}> {order.name}</p>
                    <span className={`${style.status} text text_type_main-small mt-3`}>
                         <p className={orderStatusDone ? style.statusDone : style.status}>{orderStatus()}</p>
                    </span>
                    <div className='mt-15'>
                        <h2 className="text text_type_main-medium mb-6">Состав:</h2>
                        <div className={style.list}>
                            {
                                countedElements.map(({item, count}, index) => {
                                    return (
                                        <FeedDetailsIngridient
                                            item={item}
                                            count={count}
                                            key={index}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={`${style.details} mb-5 mt-10`}>
                        <span className='text text_type_main-default text_color_inactive'>
                             <FormattedDate date={new Date(order?.updatedAt)}/>
                        </span>
                        <div className={style.price}>
                            <span className='text text_type_digits-default mr-2'>{totalCost}</span>
                            <CurrencyIcon type='primary'/>
                        </div>

                    </div>
                </section>

            }
        </>
    )
}