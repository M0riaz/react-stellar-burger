import style from './register.module.css'
import {EmailInput, PasswordInput, Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC, FormEvent} from "react";
import { Link } from 'react-router-dom';
// import {useDispatch, useSelector} from "react-redux";
import {regNewUser} from "../../services/actions/regestrationUser";
import {useDispatch} from "../../services/store/typesStore";
import {useForm} from "../../hook/Form";

export const Register: FC = () => {
    const dispatch = useDispatch();
    const {values: form, onChange} = useForm({email: '', name: '', password: ''})
    const inputRef = React.useRef(null)

    const onClick = (e:FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
     dispatch(regNewUser(form))

    }

    return (
        <section className={style.page}>
            <div className={style.box}>
                <h1 className="text text_type_main-medium"> Регистрация</h1>
                <form onSubmit={onClick}>
                <div className='mt-6'>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={form.name}
                    name={'name'}
                    error={false}
                    ref={inputRef}
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

                <div className='mt-6 mb-20'>
                        <Button htmlType="submit" type="primary" size="large" >
                            Зарегистрироваться
                        </Button>
                </div>
            </form>
                <div className={style.links}>
                    <p className={`${style.text} text text_type_main-default text_color_inactive`}>
                        Уже зарегистрированы</p>
                    <Link to='/login' className={`${style.link} ml-4  text text_type_main-default`}>Войти </Link>
                </div>
            </div>
        </section>
    )
}