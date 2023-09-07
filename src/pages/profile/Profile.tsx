import style from './profile.module.css'
import React, {ReactNode} from "react";
import {Link, useNavigate, NavLink, useLocation} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {disconnectOrdersUser} from "../../services/actions/ordersFeedUserAction";
import {logOutCurrentUser} from "../../services/actions/logOutCurrentUser";

interface ProfileProps {
    children: ReactNode
}

export const Profile: React.FC<ProfileProps> = ({children}) => {
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
                            <span  className={`${style.linkin} text text_type_main-medium`} onClick={logOutClick}>
                                 Выход
                            </span>

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