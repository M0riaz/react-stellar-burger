import React from "react";
import {Logo, BurgerIcon, ProfileIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './appHeader.module.css'
import {Link, NavLink, useLocation} from 'react-router-dom';
import style from "../../pages/profile/profile.module.css";



export default function AppHeader() {
    const location = useLocation();
    const linkStyle = ({ isActive }) => isActive ? style.activeLink : style.link;
    return (
        <header className={styles.header}>
            <div className={styles.header__box}>
                <nav className={styles.header__navigation}>
                    <div className={styles.header__item}>
                        {
                            location.pathname === '/' ?
                                <BurgerIcon type="primary" /> :
                                <BurgerIcon type="secondary" />
                        }
                        <span className='text text_type_main-default ml-3 mr-5'>
                            <NavLink to='/' className={linkStyle}>Конструктор </NavLink>
                        </span>

                    </div>
                    <div className={`${styles.header__item} ml-2`}>
                        {
                            location.pathname === '/orders' ?
                                <ListIcon type="primary" /> :
                                <ListIcon type="secondary" />
                        }
                        <p className='text text_type_main-default mr-5 ml-3 '>
                            <NavLink to='/orders' className={linkStyle} >Лента заказов</NavLink>
                        </p>

                    </div>
                </nav>
                <Logo/>
                <div className={`${styles.header__item} `}>
                    {
                        location.pathname === '/profile' ?
                            <ProfileIcon type="primary" /> :
                            <ProfileIcon type="secondary" />
                    }
                    <p  className="text text_type_main-default mr-5 ml-2">
                        <NavLink to={'/profile'} className={linkStyle} >Личный кабинет </NavLink>
                    </p>

                </div>
            </div>
        </header>
    )
}