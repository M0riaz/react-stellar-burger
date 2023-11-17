import style from './login.module.css'
import {EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC, FormEvent} from "react";
import {Link, Navigate, NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
// import {useDispatch} from "react-redux";
import {loginCurrentUser} from "../../services/actions/loginCurrentUser";
import {getUserData} from "../../services/actions/getUserData";
import {useDispatch, useSelector} from "../../services/store/typesStore";
import {useForm} from "../../hook/Form";

interface IIsAuth{
    isAuth: boolean
}

export const Login: FC = () => {
    const dispatch = useDispatch();
    const {values: form, onChange} = useForm({email: '',  password: ''})
    const {isAuth}:IIsAuth = useSelector(state => state.regNewUser);
    const navigate: NavigateFunction = useNavigate();

    const onClick = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form) {
            await dispatch(loginCurrentUser(form));
        } else {
            console.log('неверные данные ')
        }
    };

    React.useEffect( () => {
        if (isAuth) {
            dispatch(getUserData())
            navigate("/")
        }
    }, [isAuth])


    return (
        <section className={style.page}>
            <div className={style.box}>
                <h1 className="text text_type_main-medium"> Вход</h1>
                <form onSubmit={onClick}>
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
                        <Button htmlType="submit" type="primary" size="large">
                            Войти
                        </Button>
                    </div>
                </form>

                <div className={style.links}>
                    <p className={`${style.text} text text_type_main-default text_color_inactive`}>Вы - новый
                        пользователь?</p>
                    <Link to='/register'
                          className={`${style.link} ml-4  text text_type_main-default`}>Зарегистрироваться </Link>
                </div>

                <div className={`${style.links} mt-4`}>
                    <p className={`${style.text} text text_type_main-default text_color_inactive`}> Забыли пароль?</p>
                    <Link to='/forgot-password' className={`${style.link} ml-4 text text_type_main-default`}>Восстановить
                        пароль </Link>
                </div>
            </div>
        </section>
    )
}

