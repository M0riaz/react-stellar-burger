import styles from './burgerConstructor.module.css';
import {
    CurrencyIcon,
    DragIcon,
    Button,
    ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

function BurgerConstructor({ data }) {
    const activeBun = data.find((item) => item.type === 'bun');
    const ingredients = data.filter((item) => item.type !== 'bun');

    const renderIngredients = () => {
        return ingredients.map((item) => (
            <div className='mb-4 ml-3 mr-2'>
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
                <div className={`${styles.element} ml-4 pl-5 mb-4`}>
                    <ConstructorElement
                        isLocked={true}
                        type='top'
                        text={`${activeBun.name} (верх)`}
                        thumbnail={activeBun.image}
                        price={activeBun.price}
                    />
                </div>

                <div className={styles.ingredients}>
                    {renderIngredients()}
                </div>
                <div className='ml-4 pl-5 '>
                    <ConstructorElement
                        isLocked={true}
                        type='bottom'
                        text={`${activeBun.name} (низ)`}
                        thumbnail={activeBun.image}
                        price={activeBun.price}
                    />
                </div>
                <div className={`${styles.priceContainer} mr-5 mt-5 pt-5`}>
                    <div className={styles.price}>
                        <p className='text text_type_digits-medium mr-2'>610</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <div className='ml-5 pl-5'>
                        <Button htmlType="button" type="primary" size="large">
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerConstructor;