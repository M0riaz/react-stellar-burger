import style from './resetPassword.module.css'
import {PasswordInput, Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";
import { Link } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {resetPass} from "../../services/actions/regestrationUser";

export const ResetPassword = () => {
    const dispatch = useDispatch();
    const [token, setToken] = React.useState('')
    const [password, setPassword] = React.useState('')

    const onChangePasss = e => {
        setPassword(e.target.value)
    }

    const inputRef = React.useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const onClick = () => {
        const values = { password, token}
        dispatch(resetPass(values))
    }

    return (
        <section className={style.page}>
            <div className={style.box}>
                <h1 className="text text_type_main-medium"> Восстановление пароля</h1>

                <div className='mt-6'>
                    <PasswordInput
                        onChange={onChangePasss}
                        value={password}
                        name={'password'}
                        extraClass="mb-2"
                        placeholder={'Введите новый пароль'}
                    />
                </div>

                <div className='mt-6'>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setToken(e.target.value)}
                        value={token}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                </div>

                <div className='mt-6 mb-20'>
                    <Link to='/login'>
                        <Button htmlType="button" type="primary" size="large" onClick={onClick}>
                            Сохранить
                        </Button>
                    </Link>

                </div>

                <div className={style.links}>
                    <p className={`${style.text} text text_type_main-default text_color_inactive`}>Вспомнили пароль?</p>
                    <Link to='/login' className={`${style.link} ml-4  text text_type_main-default`}>Войти</Link>
                </div>

            </div>
        </section>
    )
}