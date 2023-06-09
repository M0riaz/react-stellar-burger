import styles from './burgerIngredients.module.css'
import {CurrencyIcon, Tab, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-types'
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";


function BurgerElement({data}) {
    const [modalActive, setModalActive] = React.useState(false )

    return (
        <div className={styles.container} onClick={() => setModalActive(!modalActive)}>
            <img className={styles.image} src={data.image} alt={data.name} />
            <div className={styles.info}>
                <div className={styles.price}>
                    <p className="text text_type_digits-default pt-1 mr-2">{data.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <div>
                    <p className="text text_type_main-small pt-2">{data.name}</p>
                </div>
            </div>
            <Counter count={0} size="default"/>
            {modalActive && <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <IngredientDetails data={data}/>
            </Modal>
            }
        </div>
    )

}


 function BurgerIngredients(props) {

    const [current, setCurrent] = React.useState('bun');

    const bun = props.data.filter((item) => item.type === 'bun');
    const main = props.data.filter((item) => item.type === 'main');
    const sauce = props.data.filter((item) => item.type === 'sauce');

    return (
        <section className={styles.section}>



            <h1 className='text text_type_main-large pt-5 mt-5'>
                Соберите бургер
            </h1>
            <nav className='mt-5'>
                <div style={{display:"flex"}}>
                    <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
            </nav>
            <h2 className='text text_type_main-medium pt-5 mt-5'>Булки</h2>
            <div className={styles.itemList}>
                <div className={styles.box}>
                    {bun.map((item) => (
                        <BurgerElement data={item} key={item._id} />
                    ))}
                </div>

                <h2 className='text text_type_main-medium pt-5 mt-5'>Соусы</h2>
                <div className={styles.box}>
                    {sauce.map((item) => (
                        <BurgerElement data={item} key={item._id}/>
                    ))}
                </div>

                <h2 className='text text_type_main-medium pt-5 mt-5'>Начинки</h2>
                <div className={styles.box}>
                    {main.map((item) => (
                        <BurgerElement data={item} key={item._id}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default React.memo(BurgerIngredients);

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired
};