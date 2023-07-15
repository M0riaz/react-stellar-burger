import img404 from '../../images/error-404.jpg'
import style from './error404.module.css'
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";
import { Link } from 'react-router-dom';

export const Error404 = () => {
    return(
        <div className={style.box}>
            <img src={img404} alt='Упс! Окно ошибки 404'/>
            <div className={style.btn}>
                <Link to='/'>
                <Button htmlType="button" type="primary" size="large">
                    Вернутся на главную
                </Button>
                </Link>
            </div>
        </div>
    )
}