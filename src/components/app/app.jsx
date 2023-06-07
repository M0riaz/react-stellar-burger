import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React, {useEffect} from 'react';

function App() {
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
                <BurgerIngredients data={data}/>
                <BurgerConstructor data={data}/>
            </main>
        </div>
    );
}

export default App;
