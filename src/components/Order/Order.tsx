import style from './Order.module.css'
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch} from "react-redux";
import React, {useState} from "react";

import {Link, useLocation} from "react-router-dom";
import {ImageElement} from "../ImageElement/ImageElement";
import {openModal} from "../../services/actions/modal";
import {useSelector} from "../../services/store/typesStore";
import {IOrderFromList} from "../../types/order";
import {IIngredient} from "../../types/ingridient";


interface IOrderProps {
    item: IOrderFromList
}

export const Order = (props: IOrderProps) => {
    const {item} = props
    const items = useSelector(state => state.getItems.items)

    const orderItems = item.ingredients.map(ingredientId => {
        return items.find(item => item._id === ingredientId);
    }).filter( item => item);


    const location = useLocation();
    const [modalActive, setModalActive] = React.useState(false)

    const [marginLeft, setMarginLeft] = useState(0);

    const ingredientId = item.number;
    const dispatch = useDispatch();

    React.useEffect(() => {
        setMarginLeft(prevMarginLeft => prevMarginLeft - 15);
    }, []);

    const displayedItems = orderItems.slice(0, 6);

    const orderStatus = () =>
        item.status === 'done' ? 'Выполнен' : item.status === 'pending' ? 'Готовится' : item.status === 'created' ? 'Создан' : 'Выполнен'

    const orderStatusDone = item.status === 'done';
    const
        handleClick = () => {
            setModalActive(true);
            // @ts-ignore
            dispatch(openModal(item))
        }

    const bunCount = orderItems.filter(item => item?.type === 'bun').length;

    const totalCost = orderItems.reduce((total, item) => {
        if (item?.type === 'bun' && bunCount === 1) {
            return total + item.price * 2;
        } else {
            return total + (item ? item.price : 0);
        }
    }, 0);

    return (
        <Link className={style.link}
              to={`${location.pathname}/${ingredientId}`}
              state={{background: location}}
              key={ingredientId}
        >
            <div onClick={handleClick} className={`${style.main} mb-4`}>
                <div className={`${style.details} mt-6`}>
                    <span className='text text_type_digits-default ml-6'>#{item.number}</span>
                    <span className='text text_type_main-default text_color_inactive mr-6'>
                         <FormattedDate date={new Date(item.createdAt)}/>
                    </span>

                </div>
                <p className='text text_type_main-medium ml-6 mt-5 mr-3'>{item.name}</p>

                <span className={`${style.status} text text_type_main-small mt-3 ml-6`}>
                    <p className={orderStatusDone ? style.statusDone : style.status}>{orderStatus()}</p>
                    </span>
                <div className={`${style.ingredients} ml-6 mt-6 mr-6 mb-6`}>
                    <div className={`${style.imgContainer} mr-6`}>
                        {
                            displayedItems && displayedItems.map((i, index) => (
                                <div style={{zIndex: 1000 - index, marginLeft}} key={index}>
                                    <ImageElement data={i as IIngredient}/>
                                </div>
                            ))
                        }
                        {item.ingredients.length > 6 &&
                            <div className={`${style.counter} text text_type_digits-default`}
                                 style={{marginLeft}}>+{item.ingredients.length - 6}</div>
                        }
                    </div>
                    <div className={`${style.price}`}>
                        <span className='text text_type_digits-default mr-2'>{totalCost}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        </Link>
    )
}