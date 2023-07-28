import style from './ingredients.module.css'
import React from "react";
import { useSelector, useDispatch,  } from "react-redux";
import {getItems} from "../../services/actions/get_items";
import { useParams } from "react-router-dom";


 const IngredientPage = () => {
     const { ingredientId } = useParams();
     const items = useSelector(state => state.getItems.items);
     const dispatch = useDispatch();

     React.useEffect(() => {
         dispatch(getItems());
     }, [dispatch]);

     const item = items.find(item => item._id === ingredientId);
    return (
        item ? (
        <div >
            <h1 className="text text_type_main-large mt-10 ml-10">
                Детали ингредиента
            </h1>
            <div className={style.container}>

                <img className={style.image} src={item.image} alt={item.name}/>
                <p className="text text_type_main-medium mt-4">
                    {item.name}
                </p>
                <ul className={`${style.list} text text_type_main-default text_color_inactive mt-8 mb-15`}>
                    <li className={`mr-5 ${style.listItem}`}>
                        <p>Калории,ккал</p>
                        <p className="text text_type_digits-default">{item.calories}</p>
                    </li>
                    <li className={`mr-5 ${style.listItem}`}>
                        <p>Белки, г</p>
                        <p className="text text_type_digits-default">{item.proteins}</p>
                    </li>
                    <li className={`mr-5 ${style.listItem}`}>
                        <p>Жиры, г</p>
                        <p className="text text_type_digits-default">{item.fat}</p>
                    </li>
                    <li className={` ${style.listItem}`}>
                        <p>Углеводы, г</p>
                        <p className="text text_type_digits-default">{item.carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </div>
   ) : (<div>Загрузка...</div>)
    )

}

export default IngredientPage;