import {Order} from "../../components/Order/Order";
import style from './feed.module.css'


export const Feed = () => {
    return(
            <section className={style.main}>
                <h1 className='text text_type_main-large mt-10 mb-7'>Лента Заказов</h1>
                <div className={style.content}>
                    <div className={`${style.itemBox} mr-15`}>
                        <Order/>
                        <Order/>
                        <Order/>
                        <Order/>
                        <Order/>
                        <Order/>
                        <Order/>

                    </div>
                    <div className={style.statisticBox}>
                        <div className={style.lists}>
                            <div className={`${style.listBox} mr-9`}>
                                <h2 className={`${style.headers} mb-6 text text_type_main-medium`}>Готовы:</h2>
                                <ul className={`${style.listReady} text text_type_digits-default`}>
                                    <li>034533</li>
                                    <li>034532</li>
                                    <li>034530</li>
                                    <li>034527</li>
                                    <li>034525</li>
                                </ul>
                            </div>
                            <div className={style.listBox}>
                                <h2 className={`${style.headers} mb-6 text text_type_main-medium`}>В работе:</h2>
                                <ul className={`${style.list} text text_type_digits-default`}>
                                    <li>034538</li>
                                    <li>034541</li>
                                    <li>034542</li>
                                </ul>
                            </div>
                        </div>
                        <div className={`${style.orders} mt-15`}>
                            <h2 className={`${style.headers} mb-6 text text_type_main-medium`}>Выполнено за все время:</h2>
                            <span className={`${style.digits} text text_type_digits-large`}>28752</span>
                        </div>
                        <div className={`${style.orders} mt-15`}>
                           <h2 className={`${style.headers} mb-6 text text_type_main-medium`}>Выполнено за сегодня:</h2>
                            <span className={`${style.digits} text text_type_digits-large`}>138</span>
                        </div>
                    </div>

                </div>
            </section>
        )
}