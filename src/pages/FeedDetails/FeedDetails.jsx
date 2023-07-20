import style from './FeedDetails.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {FeedDetailsIngridient} from '../../components/FeedDetailsIndridient/FeedDetailsIngridient'
import {useSelector} from "react-redux";

export const FeedDetails = () => {
    const items = useSelector(state => state.getItems.items)
    const item = items.find(item => item);

    return (
        item? (
            <section className={`${style.main} mt-30`}>
                <h1 className={`${style.number} text text_type_digits-default`}>#034533</h1>
                <p className={`${style.name} text text_type_main-medium mt-10`}> Black Hole Singularity острый бургер</p>
                <span className={`${style.status} text text_type_main-small mt-3`}>Выполнен</span>
                <div className='mt-15'>
                    <h2 className="text text_type_main-medium mb-6">Состав:</h2>
                    <div className={style.list}>
                        <FeedDetailsIngridient item={item}/>
                        <FeedDetailsIngridient item={item}/>

                    </div>
                </div>
                <div className={`${style.details} mt-10`}>
                    <span className='text text_type_main-default text_color_inactive'>Вчера, 13:50 i-GMT+3</span>
                    <div className={style.price}>
                        <span className='text text_type_digits-default mr-2'>510</span>
                        <CurrencyIcon type='primary'/>
                    </div>

                </div>
            </section>
            ) : null

    )
}