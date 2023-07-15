import style from './login.module.css'
import {EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getUserData, loginCurrentUser} from "../../services/actions/regestrationUser";

export const Login = () => {
    const dispatch = useDispatch();
    const [form, setForm] = React.useState({email: '', password: ''});
    const {isAuth} = useSelector(state => state.regNewUser);
    const navigate = useNavigate();

    const onChange = React.useCallback((e) => {
        setForm(prevForm => ({...prevForm, [e.target.name]: e.target.value}));
    }, []);

    const onClick = React.useCallback((e) => {
        e.preventDefault();
        if (form) {
            dispatch(loginCurrentUser(form));

        } else {
            console.log('неверные данные ')
        }

    }, [dispatch, form,]);

    React.useEffect(() => {
        if (isAuth) {
            dispatch(getUserData())
            navigate("/")
        }
    }, [isAuth])


    return (
        <section className={style.page}>
            <div className={style.box}>
                <h1 className="text text_type_main-medium"> Вход</h1>
                <form>
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
                        <Button htmlType="button" type="primary" size="large"
                                onClick={onClick}
                        >
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

