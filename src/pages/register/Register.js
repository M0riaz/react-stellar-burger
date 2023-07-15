import style from './register.module.css'
import {EmailInput, PasswordInput, Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {regNewUser} from "../../services/actions/regestrationUser";

export const Register = () => {
    const dispatch = useDispatch();
    const [form, setForm] = React.useState({email: '', name: '', password: ''});

    const inputRef = React.useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const onChange = (e) => {
        e.preventDefault()
        setForm(prevForm => ({ ...prevForm,  [e.target.name]: e.target.value }));
    };


    const onClick = () => {
        dispatch(regNewUser(form))
    }

    return (
        <section className={style.page}>
            <div className={style.box}>
                <h1 className="text text_type_main-medium"> Регистрация</h1>
                <form>
                <div className='mt-6'>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={form.name}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                </div>
                <div className='mt-6'>
                    <EmailInput
                        onChange={onChange}
                        value={form.email}
                        name={'email'}
                        isIcon={false}
                    />
                </div>

                <div className='mt-6'>
                    <PasswordInput
                        onChange={onChange}
                        value={form.password}
                        name={'password'}
                        extraClass="mb-2"
                    />
                </div>
                </form>
                <div className='mt-6 mb-20'>
                    <Link to='/'>
                        <Button htmlType="button" type="primary" size="large" onClick={onClick}>
                            Зарегистрироваться
                        </Button>
                    </Link>

                </div>

                <div className={style.links}>
                    <p className={`${style.text} text text_type_main-default text_color_inactive`}>
                        Уже зарегистрированы</p>
                    <Link to='/login' className={`${style.link} ml-4  text text_type_main-default`}>Войти </Link>
                </div>
            </div>
        </section>
    )
}