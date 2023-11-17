import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import {FC} from "react";


export const MainPage: FC = () => {
    return (
        <>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </>
    )
}