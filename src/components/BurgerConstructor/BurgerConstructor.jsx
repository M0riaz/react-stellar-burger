import styles from './burgerConstructor.module.css';
import {
    CurrencyIcon,
    DragIcon,
    Button,
    ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import React, {useEffect} from "react";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
//import {placeOrder} from '../fetch/placeOrder'

import {BurgerConstructorContext} from "../../services/BurgerConstructorContext";




function BurgerConstructor() {
    const [modalActive, setModalActive] = React.useState(false )
    const { data, selectedIngredients, selectedBun} = React.useContext(BurgerConstructorContext);
    const [orderNumber, setOrderNumber] = React.useState(null);

    //let ingredients = selectedIngredients;
   //const activeBun = data.find((item) => item.type === 'bun');
    // ingredients = data.filter((item) => item.type !== 'bun');

    const [info, setInfo] = React.useState([]);
    const url = 'https://norma.nomoreparties.space/api/orders';
    const checkResponse = (res) => {
        return res.ok ? res.json() : res.json().then((err)=> Promise.reject(err))
    };
    const placeOrder = () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ingredients: selectedIngredients.map((ingredient) => ingredient._id),
            }),
        })
            .then(checkResponse)
            .then(data => {
                if (data.success) {
                    setOrderNumber(data.order.number);
                    setModalActive(true);
                } else {
                    console.log('Ошибка с заказом')
                }
            })
            .catch(error => {
                console.error('Ошибка с заказом', error);
            });
    };
    useEffect(() => {
        fetch(url)
            .then(checkResponse)
            .then(res => setInfo(res.data))
            .catch(err => console.log(err))
    },[]);


    const totalPrice = React.useMemo(() => {
        const price = selectedIngredients.reduce((total, ingredient) => {
            return total + ingredient.price;
        }, 0);
        return price + (selectedBun ? selectedBun.price * 2 : 0);
    }, [selectedBun, selectedIngredients]);

    const renderIngredients = () => {
        return selectedIngredients.map((item, index) => (

            <div key={index} className='mb-4 ml-3 mr-2'>
                <DragIcon type='primary' />
                <ConstructorElement
                    key={item._id}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}

                />
            </div>
        ));
    };

    return (
        <div>
            <section className={`${styles.section} ml-5 pl-5`}>
                {modalActive && (
                    <Modal modalActive={modalActive} setModalActive={setModalActive}>
                        <OrderDetails orderNumber={orderNumber} />
                    </Modal>
                )}

                <div className={`${styles.element} ml-4 pl-5 mb-4`}>

                    {selectedBun && <ConstructorElement
                        isLocked={true}
                        type='top'
                        text={`${selectedBun.name} (верх)`}
                        thumbnail={selectedBun.image}
                        price={selectedBun.price}
                        key = {selectedBun._id}
                    />}
                </div>

                <div className={styles.ingredients}>
                    {renderIngredients()}
                </div>
                <div className='ml-4 pl-5 '>
                    { selectedBun && <ConstructorElement
                        isLocked={true}
                        type='bottom'
                        text={`${selectedBun.name} (низ)`}
                        thumbnail={selectedBun.image}
                        price={selectedBun.price}
                        key = {selectedBun._id}

                    />}
                </div>
                <div className={`${styles.priceContainer} mr-5 mt-5 pt-5`}>
                    <div className={styles.price}>
                        <p className='text text_type_digits-medium mr-2'>
                            {totalPrice}
                        </p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <div  className='ml-5 pl-5'>
                        <Button htmlType="button" type="primary" size="large" onClick={placeOrder} >
                            Оформить заказ
                        </Button>
                    </div>
                </div>

            </section>
        </div>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType)
};

export default React.memo(BurgerConstructor);