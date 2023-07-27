import style from './profile.module.css'
import React from "react";
import {Link, useNavigate, NavLink, useLocation} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logOutCurrentUser} from "../../services/actions/regestrationUser";
import {disconnectOrdersUser} from "../../services/actions/ordersFeedUserAction";

export const Profile = ({children}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const logOutClick = () => {
        const token = localStorage.getItem("refreshToken");
        dispatch(logOutCurrentUser({token}));
        navigate('/login');
        dispatch(disconnectOrdersUser())
    }

    const isProfileActive = location.pathname === '/profile';
    const isOrderActive = location.pathname === '/profile/order';

    return (
        <section className={style.page}>
            <div className={style.container}>
                <div>
                    <nav>
                        <div className={style.menu}>
                            <span className='text text_type_main-medium'>
                                <NavLink to='/profile'
                                         className={isProfileActive ? style.activeLink : style.link}
                                >Профиль </NavLink>
                            </span>
                            <span className='text text_type_main-medium'>

                            <NavLink to='/profile/order'
                                     className={isOrderActive ? style.activeLink : style.link}
                            >История заказов</NavLink>
                            </span>
                            <Link onClick={logOutClick}
                                  className={`${style.linkin} text text_type_main-medium`}>Выход</Link>
                        </div>
                    </nav>

                    <div className={style.text}>
                        <p className="mt-20 text text_type_main-default text_color_inactive">
                            В этом разделе вы можете изменить свои персональные данные</p>
                    </div>
                </div>
                {children}

            </div>

        </section>
    )
}