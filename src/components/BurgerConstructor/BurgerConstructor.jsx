import styles from './burgerConstructor.module.css';
import {
    CurrencyIcon,
    DragIcon,
    Button,
    ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useRef} from "react";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

import {useSelector, useDispatch} from 'react-redux';
import {
    getOrder,
    addIngredient,
    deleteIngredientById,
    addBun,
    openModal,
    closeModal,
    updateItem,
} from '../../services/actions/actions'
import {useDrop, useDrag} from 'react-dnd';


function RenderIngredients(props) {
    const {
        moveItem,
        index,
        item,
        children,
        id
    } = props;

    const dispatch = useDispatch();
    const ref = useRef(null);


    const [, drop] = useDrop({
        accept: 'i',
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex)
            item.index = hoverIndex;
        },
    });

    const [{isDragging}, drag] = useDrag({
        type: 'i',
        item: () => {
            return {
                id: item._id, index: index
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    const handleDeleteClick = () => {
        deleteIngredientById(dispatch, index);
    };

    drag(drop(ref));

    return (
        <div ref={ref}
             key={index}
             style={{opacity}}
             className={`${styles.price} mb-4 ml-3 mr-2`}>
            <DragIcon type='primary'/>
            <ConstructorElement
                key={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={handleDeleteClick}
            />
            {children}
        </div>
    )
}

function BurgerConstructor() {
    const [modalActive, setModalActive] = React.useState(false);
    const dispatch = useDispatch();
    const {burgerConstructor, bun, order} = useSelector(state => state.itemReducer);
    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop: (item) => {
            if (item.data.type === "bun") {
                addBun(dispatch, item.data);
            } else {
                addIngredient(dispatch, item.data)
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });
    const moveItem = (dragIndex, hoverIndex) => {
        const dragItem = burgerConstructor[dragIndex]
        const newItem = [...burgerConstructor]

        newItem.splice(dragIndex, 1)
        newItem.splice(hoverIndex, 0, dragItem)
        updateItem(dispatch, newItem)
    }

    const handelOnClickItem = (data) => {
        setModalActive(true);
        openModal(dispatch, data)
    }
    const handelOnCloseItem = () => {
        setModalActive(false);
        closeModal(dispatch)
    }

    const placeOrder = () => {
        const burgerConstructorIds = burgerConstructor.map(item => item._id)
        dispatch(getOrder(burgerConstructorIds));
        handelOnClickItem()
        setModalActive(true);
    };

    const totalPrice = React.useMemo(() => {
        const price = burgerConstructor.reduce((total, ingredient) => {
            return total + ingredient.price;
        }, 0);
        return price + (bun ? bun.price * 2 : 0);
    }, [bun, burgerConstructor]);

    return (
        <div ref={dropRef}>
            <section className={`${styles.section} ml-5 pl-5`}>
                {modalActive && (
                    <Modal modalActive={modalActive} setModalActive={handelOnCloseItem}>
                        <OrderDetails orderNumber={order}/>
                    </Modal>
                )}

                <div className={`${styles.element} ml-4 pl-5 mb-4`}>
                    {bun && <ConstructorElement
                        isLocked={true}
                        type='top'
                        text={`${bun.name} (верх)`}
                        thumbnail={bun.image}
                        price={bun.price}
                        key={bun._id}

                    />}
                </div>

                <div className={styles.ingredients}>
                    {burgerConstructor.map((item, index) => <RenderIngredients
                        key={index}
                        item={item}
                        index={index}
                        moveItem={moveItem}
                    />)}
                </div>

                <div className='ml-4 pl-5 '>
                    {bun && <ConstructorElement
                        isLocked={true}
                        type='bottom'
                        text={`${bun.name} (низ)`}
                        thumbnail={bun.image}
                        price={bun.price}
                        key={bun._id}
                    />}
                </div>

                <div className={`${styles.priceContainer} mr-5 mt-5 pt-5`}>
                    <div className={styles.price}>
                        <p className='text text_type_digits-medium mr-2'>
                            {totalPrice}
                        </p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <div className='ml-5 pl-5'>
                        <Button htmlType="button" type="primary" size="large" onClick={placeOrder}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}


export default React.memo(BurgerConstructor);