import React from "react";
import styles from './orderDetails.module.css';
import {
} from '@ya.praktikum/react-developer-burger-ui-components';
import done from '../../images/done.svg'
import PropTypes from 'prop-types';
function OrderDetails ({ orderNumber }){

    return (
            <div >
                <div className={styles.container}>
                    <h1 className='text text_type_digits-large mt-30 '>
                        {orderNumber}
                    </h1>
                    <p className="text text_type_main-medium mt-8">
                        идентификатор заказа
                    </p>
                    <img className={`${styles.image} mt-15`} src={done} alt='готово!'/>
                    <p className="text text_type_main-small mt-15">
                        Ваш заказ начали готовить
                    </p>
                    <p className="text text_type_main-default text_color_inactive mt-2 mb-30" >
                        Дождитесь готовности на орбитальной станции
                    </p>
                </div>

            </div>
        )

}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number,
};

export default OrderDetails