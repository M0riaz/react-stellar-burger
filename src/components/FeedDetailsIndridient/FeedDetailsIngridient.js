import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ImageElement} from "../ImageElement/ImageElement";
import style from './FeedDetailsIngridient.module.css'

export const FeedDetailsIngridient = ({item, count}) => {


    return (
        <> {item &&
            <div className={`${style.main} mb-4`}>
                <div className={`${style.item}`}>
                    <ImageElement data={item}/>
                    <p className='ml-4 mr-4 text text_type_main-default'>{item.name}</p>
                </div>

                <div className={`${style.price} mr-6`}>
                    <span className='text text_type_digits-default'>{count}</span>
                    <span className='text text_type_main-default mr-2 ml-2'>x</span>
                    <span className='text text_type_digits-default'>{item.price}</span>
                    <CurrencyIcon type='primary'/>
                </div>
            </div>
        }

        </>
    )
}