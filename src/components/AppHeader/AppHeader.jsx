import React from "react";
import {Logo, BurgerIcon, ProfileIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './appHeader.module.css'

export default function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.header__box}>
                <nav className={styles.header__navigation}>
                    <div className={styles.header__item}>
                        <BurgerIcon type={"primary"}/>
                        <p className="text text_type_main-default mr-5">Конструктор</p>
                    </div>
                    <div className={`${styles.header__item} ml-2`}>
                        <ListIcon type={"secondary"}/>
                        <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                    </div>
                </nav>
                <Logo/>
                <div className={`${styles.header__item} `}>
                    <ProfileIcon type={"secondary"}/>
                    <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
                </div>
            </div>
        </header>
    )
}