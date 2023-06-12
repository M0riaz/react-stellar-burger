import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React, {useEffect} from 'react';


import {BurgerConstructorContext} from "../../services/BurgerConstructorContext";

function App() {

    const [selectedIngredients, setSelectedIngredients] = React.useState([]);
    const [selectedBun, setSelectedBun] = React.useState(null);
    const addIngredient = (ingredient) => {
        setSelectedIngredients((prevIngredients) => [...prevIngredients, ingredient]
        );
    };

    const setActiveBun = (bun) => {
        setSelectedBun(bun);
    }

    const [data, setData] = React.useState([]);
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    const checkResponse = (res) => {
        return res.ok ? res.json() : res.json().then((err)=> Promise.reject(err))
    };
    useEffect(() => {
        fetch(url)
            .then(checkResponse)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    },[])


    return (

    <div className={styles.app}>
        <AppHeader/>
        <main className={styles.main}>
            { data.length &&
                <BurgerConstructorContext.Provider value={{
                    data,
                    addIngredient,
                    selectedIngredients,
                    selectedBun,
                    setActiveBun,
                }} >
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </BurgerConstructorContext.Provider>
            }
        </main>
    </div>

    );
}

export default App;
