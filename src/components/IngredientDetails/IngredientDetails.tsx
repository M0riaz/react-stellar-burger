import React, {FC} from "react";
import {
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredientDetails.module.css'
import {useSelector} from "../../services/store/typesStore";
import {IIngredient} from "../../types/ingridient";


 const IngredientDetails: FC = () => {

     const storedItem: IIngredient | null = JSON.parse(localStorage.getItem("selectedIngredient") || "null");

     // @ts-ignore
     const item: IIngredient = useSelector(state => state.modal.item) || storedItem;
     React.useEffect(() => {
         if (item) {
             localStorage.setItem("selectedIngredient", JSON.stringify(item));
         }
     }, [item]);

     if (!item) {
         return null;
     }
return(
    <div >
       <h1 className="text text_type_main-large mt-10 ml-10">
           Детали ингредиента
       </h1>
        <div className={styles.container}>
            <img className={styles.image} src={item.image} alt={item.name}/>
            <p className="text text_type_main-medium mt-4">
                {item.name}
            </p>
            <ul className={`${styles.list} text text_type_main-default text_color_inactive mt-8 mb-15`}>
                <li className={`mr-5 ${styles.listItem}`}>
                    <p>Калории,ккал</p>
                    <p className="text text_type_digits-default">{item.calories}</p>
                </li>
                <li className={`mr-5 ${styles.listItem}`}>
                    <p>Белки, г</p>
                    <p className="text text_type_digits-default">{item.proteins}</p>
                </li>
                <li className={`mr-5 ${styles.listItem}`}>
                    <p>Жиры, г</p>
                    <p className="text text_type_digits-default">{item.fat}</p>
                </li>
                <li className={` ${styles.listItem}`}>
                    <p>Углеводы, г</p>
                    <p className="text text_type_digits-default">{item.carbohydrates}</p>
                </li>
            </ul>
        </div>

    </div>
)
}

export default IngredientDetails
