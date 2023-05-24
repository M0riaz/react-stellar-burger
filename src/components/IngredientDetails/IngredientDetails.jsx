import React from "react";
import {
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredientDetails.module.css'
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";

function IngredientDetails ({data}) {
return(
    <div >
       <h1 className="text text_type_main-large mt-10 ml-10">
           Детали ингредиента
       </h1>
        <div className={styles.container}>
            <img className={styles.image} src={data.image} alt={data.name}/>
            <p className="text text_type_main-medium mt-4">
                {data.name}
            </p>
            <ul className={`${styles.list} text text_type_main-default text_color_inactive mt-8 mb-15`}>
                <li className={`mr-5 ${styles.listItem}`}>
                    <p>Калории,ккал</p>
                    <p className="text text_type_digits-default">{data.calories}</p>
                </li>
                <li className={`mr-5 ${styles.listItem}`}>
                    <p>Белки, г</p>
                    <p className="text text_type_digits-default">{data.proteins}</p>
                </li>
                <li className={`mr-5 ${styles.listItem}`}>
                    <p>Жиры, г</p>
                    <p className="text text_type_digits-default">{data.fat}</p>
                </li>
                <li className={` ${styles.listItem}`}>
                    <p>Углеводы, г</p>
                    <p className="text text_type_digits-default">{data.carbohydrates}</p>
                </li>
            </ul>
        </div>

    </div>
)
}

export default IngredientDetails

IngredientDetails.propTypes = {
    data: PropTypes.object.isRequired,
};