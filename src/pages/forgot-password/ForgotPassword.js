import style from './forgotPassword.module.css'
import {Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";
import { Link, useNavigate  } from 'react-router-dom';
import {useDispatch} from "react-redux";

import {getPass} from "../../services/actions/regestrationUser";

export const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [value, setValue] = React.useState('')
    const onChange = e => {
        setValue(e.target.value)
    }
    const dataPass = (e) => {
        e.preventDefault()
        dispatch(getPass(value))
            .then(() => navigate('/reset-password', { replace: true }))
    }

    return (
        <section className={style.page}>
            <div className={style.box}>
                <h1 className="text text_type_main-medium"> Восстановление пароля</h1>
                <form onSubmit={dataPass}>
                <div className='mt-6'>
                    <EmailInput
                        onChange={onChange}
                        value={value}
                        name={'email'}
                        isIcon={false}
                        placeholder={'укажите e-mail'}
                    />
                </div>

                <div className='mt-6 mb-20'>
                    <Button htmlType="submit" type="primary" size="large" >
                        Восстановить
                    </Button>
                </div>
                </form>
                <div className={style.links}>
                    <p className={`${style.text} text text_type_main-default text_color_inactive`}>Вспомнили пароль?</p>
                    <Link to='/login' className={`${style.link} ml-4  text text_type_main-default`}>Войти</Link>
                </div>
            </div>
        </section>
    )
}