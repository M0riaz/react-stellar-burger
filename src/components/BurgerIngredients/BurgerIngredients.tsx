import styles from './burgerIngredients.module.css'
import {CurrencyIcon, Tab, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC} from 'react';

import {useDispatch} from 'react-redux';
import {
    addBun,
    addIngredient,
} from '../../services/actions/actions'
import {useDrag} from "react-dnd";
import {openModal} from "../../services/actions/modal";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "../../services/store/typesStore";
import {IIngredient} from "../../types/ingridient";

interface IBurgerElProps {
    data: IIngredient
}

const BurgerElement: FC<IBurgerElProps> = (props: IBurgerElProps) => {
    const {data} = props;

    const {burgerConstructor, activeBun} = useSelector((state) => state.itemReducer);
    const dispatch = useDispatch();

    const location = useLocation();

    const ingredientId = data['_id'];

    const [{isDragging}, dragRef] = useDrag({
        type: "ingredient",
        item: {id: data._id, data},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [modalActive, setModalActive] = React.useState(false)
    const handleIngredientClick = () => {

        if (data.type !== "bun") {
            dispatch(addIngredient(data))
            setModalActive(true);
            dispatch(openModal(data))
        } else {
            setModalActive(true);
            dispatch(addBun(data))
            dispatch(openModal(data))
        }
    };
    const bunCount = React.useMemo(() => {
        return activeBun.filter(item => item._id === data._id).length
    }, [activeBun])


    const count = React.useMemo(() => {
        return burgerConstructor.filter(item => item._id === data._id).length
    }, [burgerConstructor, data._id]);

    return (
        <>
            {
                !isDragging && (
                    <Link
                        key={ingredientId}
                        to={`/ingredients/${ingredientId}`}
                        state={{background: location}}
                        className={styles.link}>

                        <div ref={dragRef} className={styles.container}>
                            <img className={styles.image} src={data.image} alt={data.name}
                                 onClick={
                                     handleIngredientClick
                                 }
                            />
                            <div  className={styles.info}>
                                <div className={styles.price}>
                                    <p className="text text_type_digits-default pt-1 mr-2">{data.price}</p>
                                    <CurrencyIcon type="primary"/>
                                </div>
                                <div>
                                    <p className="text text_type_main-small pt-2">{data.name}</p>
                                </div>

                            </div>
                            {
                                data.type === 'bun' ?
                                    (<Counter count={bunCount} size="default"/>) : (<Counter count={count} size="default"/>)
                            }
                        </div>
                    </Link>
                )
            }
        </>
    )

}

const BurgerIngredients: FC = () => {

    const items = useSelector(state => state.getItems.items);
    const [current, setCurrent] = React.useState('bun');

    const bunRef = React.useRef<HTMLHeadingElement | null>(null);
    const sauceRef = React.useRef<HTMLHeadingElement | null>(null);
    const mainRef = React.useRef<HTMLHeadingElement | null>(null);
    const handleScroll = () => {

        const bunTop = bunRef.current?.getBoundingClientRect().top;

        const sauceTop = sauceRef.current?.getBoundingClientRect().top;

        const mainTop = mainRef.current?.getBoundingClientRect().top;
        if (bunTop && sauceTop && mainTop) {
            if (bunTop <= 0 && sauceTop > 0) {
                setCurrent("bun");
            } else if (sauceTop <= 0 && mainTop > 0) {
                setCurrent("sauce");
            } else if (mainTop <= 0) {
                setCurrent("main");
            }
        }
    };

    React.useEffect(() => {
        const itemList = document.querySelector(`.${styles.itemList}`);
        itemList?.addEventListener("scroll", handleScroll);
        return () => {
            itemList?.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const bun = items.filter((item) => item.type === 'bun');
    const main = items.filter((item) => item.type === 'main');
    const sauce = items.filter((item) => item.type === 'sauce');

    return (

        <section className={styles.section}>
            <h1 className='text text_type_main-large pt-5 mt-5'>
                Соберите бургер
            </h1>
            <nav className='mt-5'>
                <div className={styles.item}>
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

            <div className={styles.itemList}>

                <h2 ref={bunRef} className='text text_type_main-medium pt-5 mt-5'>Булки</h2>
                <div className={styles.box}>
                    {bun.map((item) => (
                        <BurgerElement
                            data={item} key={item._id}/>
                    ))}
                </div>

                <h2 ref={sauceRef} className='text text_type_main-medium pt-5 mt-5'>Соусы</h2>
                <div className={styles.box}>
                    {sauce.map((item) => (
                        <BurgerElement
                            data={item} key={item._id}/>
                    ))}
                </div>

                <h2 ref={mainRef} className='text text_type_main-medium pt-5 mt-5'>Начинки</h2>
                <div className={styles.box}>
                    {main.map((item) => (
                        <BurgerElement
                            data={item} key={item._id}/>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default React.memo(BurgerIngredients);
