import style from './profile.module.css'
import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useState} from "react";
import {Link, useNavigate, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { logOutCurrentUser, updateUserData} from "../../services/actions/regestrationUser";


export const Profile = () => {
    const dispatch = useDispatch();
    const {email, name, isAuth} = useSelector(state => state.regNewUser);
    const [form, setForm] = React.useState({email: email, name: name, password: ''});
    const navigate = useNavigate();
    const inputRef = React.useRef(null);

    const onChange = (e) => {
        e.preventDefault()
        setForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }));
    };

    const onReset = (e) => {
        e.preventDefault()
        setForm({ name: name, email: email, password: '' })
        };

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0);

    }

    const logOutClick = () => {
        const token = localStorage.getItem("refreshToken");
        dispatch(logOutCurrentUser({token}));
        navigate('/login');

    }
    const saveUserChange = (e) => {
        e.preventDefault()
        dispatch(updateUserData(form))

    }

    React.useEffect(() => {

            navigate('/profile')

    }, [])

const linkStyle = ({ isActive }) => isActive ? style.activeLink : style.link;

    return (
        <section className={style.page}>
            <div className={style.container}>
                <div>
                    <nav >
                        <div className={style.menu}>
                            <span className= 'text text_type_main-medium'>
                                <NavLink to='/profile' className ={linkStyle}>Профиль </NavLink>
                            </span>
                            <span className= 'text text_type_main-medium'>
                            <NavLink to='/profile/order'  className ={linkStyle}>История заказов</NavLink>
                            </span>
                            <Link onClick={logOutClick} className={`${style.linkin} text text_type_main-medium`}>Выход</Link>
                        </div>
                    </nav>

                    <div className={style.text}>
                        <p className="mt-20 text text_type_main-default text_color_inactive">
                            В этом разделе вы можете изменить свои персональные данные</p>
                    </div>
                </div>
                <form onSubmit={saveUserChange} className={`${style.inputs} ml-15`}>
                    <div>
                        <Input
                            type={'text'}
                            placeholder={'имя'}
                            onChange={onChange}
                            icon={'EditIcon'}
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
                            placeholder="email"
                            isIcon={true}
                            extraClass="mb-2"
                        />
                    </div>
                    <div className='mt-5'>
                        <PasswordInput
                            onChange={onChange}
                            value={form.password}
                            name={'password'}
                            icon="EditIcon"
                        />
                    </div>
                    <div className={`${style.buttonsBox} mt-15`}>
                        <Button  htmlType="submit" type= "primary" size="large">Сохранить</Button>
                        <Button onClick={onReset} htmlType="reset" type= "primary" size="large">Отменить</Button>
                    </div>
                </form>
            </div>

        </section>
    )
}