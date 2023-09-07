import style from './resetPassword.module.css'
import {PasswordInput, Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC, FormEvent} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {resetPass} from "../../services/actions/resetPass";

export const ResetPassword: FC = () => {
    const dispatch = useDispatch();
    const [token, setToken] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate();
    const onChangePasss = (e: React.ChangeEvent<HTMLInputElement>) => {

        setPassword(e.target.value)
    }

    const inputRef = React.useRef(null)
    const onIconClick = () => {
        // @ts-ignore
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const onClick = (e: FormEvent) => {
        e.preventDefault()
        const values = { password, token}
        dispatch(resetPass(values))
        navigate('/login', { replace: true })
    }

    return (
        <section className={style.page}>
            <div className={style.box}>
                <h1 className="text text_type_main-medium"> Восстановление пароляqq</h1>
                <form onSubmit={onClick}>
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
                        <Button htmlType="submit" type="primary" size="large" >
                            Сохранить
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