import style from './FeedDetails.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { FeedDetailsIngridient } from '../../components/FeedDetailsIndridient/FeedDetailsIngridient'
import { useDispatch } from "react-redux";
import React, { FC } from "react";
import { IOneOrder } from '../../types/FeedOrders'
import { useSelector } from "../../services/store/typesStore";
import { IIngredient } from "../../types/ingridient";

interface CountedElement {
    item: IIngredient;
    count: number;
}

interface IFound {
    count: number;
    item: IIngredient;
}

export const FeedDetails: FC<{ order: IOneOrder }> = (props) => {
    const { order } = props;
    const items = useSelector(state => state.getItems.items);
    const element = order.ingredients.map((id: string) => {
        return items.find((i: IIngredient) => i._id === id);
    });

    const orderStatus = () =>
        order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : 'Выполнен';

    const orderStatusDone = order.status === 'done';
    // @ts-ignore
    const bunCount: number = element.filter((el) => el.type === 'bun').length;

    // @ts-ignore
    const countedElements: CountedElement[] = element.reduce((acc: CountedElement[], el: IIngredient) => {
        const found: IFound | undefined = acc.find(({ item }) => item._id === el._id);
        if (found) {
            found.count++;
        } else {
            const isSingleBun: boolean = el.type === 'bun' && bunCount === 1;
            acc.push({ item: el, count: isSingleBun ? 2 : 1 });
        }
        return acc;
    }, []);

    const totalCost: number = countedElements.reduce((total: number, { item, count }: CountedElement) => {
        return total + (item ? item.price * count : 0);
    }, 0);

    return (
        <>
            {order && (
                <section className={`${style.main} mt-15`}>
                    <h1 className={`${style.number} text text_type_digits-default`}>#{order.number}</h1>
                    <p className={`${style.name} text text_type_main-medium mt-10`}>{order.name}</p>
                    <span className={`${style.status} text text_type_main-small mt-3`}>
            <p className={orderStatusDone ? style.statusDone : style.status}>{orderStatus()}</p>
          </span>
                    <div className='mt-15'>
                        <h2 className="text text_type_main-medium mb-6">Состав:</h2>
                        <div className={style.list}>
                            {countedElements.map(({ item, count }: CountedElement, index: number) => {
                                return (
                                    <FeedDetailsIngridient
                                        item={item}
                                        count={count}
                                        key={index}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className={`${style.details} mb-5 mt-10`}>
            <span className='text text_type_main-default text_color_inactive'>
              <FormattedDate date={new Date(order?.updatedAt)} />
            </span>
                        <div className={style.price}>
                            <span className='text text_type_digits-default mr-2'>{totalCost}</span>
                            <CurrencyIcon type='primary' />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}