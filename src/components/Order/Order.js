import style from './Order.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from "react-redux";
import React from "react";

import {Link} from "react-router-dom";
import {ImageElement} from "../ImageElement/ImageElement";


export const Order = () => {
   const items = useSelector(state => state.getItems.items)
    const item = items.find(item => item);

  //  console.log(item)
    return(
        item ? (
            <Link className={style.link} to='/feed/:id'>
                <div className={`${style.main} mb-4`}>
                    <div className={`${style.details} mt-6`}>
                        <span className='text text_type_digits-default ml-6'>#034535</span>
                        <span className='text text_type_main-default text_color_inactive mr-6'>Сегодня, 16:20 i-GMT+3</span>
                    </div>
                    <p className='text text_type_main-medium ml-6 mt-5'>Death Star Starship Main бургер</p>
                    <div className={`${style.ingredients} ml-6 mt-6 mr-6 mb-6`}>
                        <div className='mr-6'>
                            <ImageElement img={item} />
                        </div>
                        <div className={`${style.price}`}>
                            <span className='text text_type_digits-default mr-2'>480</span>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </div>
            </Link>

            ): (<div>Загрузка...</div>)

    )
}