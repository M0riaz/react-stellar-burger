import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
// @ts-ignore
import React, {FC, JSX, useState} from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {getItems} from "../../services/actions/get_items";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {
    MainPage, Register, ForgotPassword, Login, ResetPassword,
    Error404, Profile, IngredientPage, Feed, FeedDetails, ProfileOrderDetiles,FeedDetailsPage
} from '../../pages/allPages'
import {OnlyUnAuth, OnlyAuth} from "../ProtectedRouteElement/ProtectedRouteElement";
import {ProfileInfo} from '../profileInfo/ProfileInfo'
import {ProfileOrder} from '../ProfileOrder/ProfileOrder'
import {ModalFeed} from "../../pages/ModalFeed/ModalFeed";
import {ModalOrderUser} from "../../pages/ModalOrderUser/ModalOrderUser";
import {getUserData} from "../../services/actions/getUserData";
import {useDispatch, useSelector} from "../../services/store/typesStore";

const App:FC = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleModalClose = (): void => {
        navigate(-1);
    };

    React.useEffect(() => {
        dispatch(getUserData());
        dispatch(getItems());
    }, []);

    return (
        <div className={styles.app}>
            <DndProvider backend={HTML5Backend}>
                <AppHeader/>
                <main className={styles.main}>
                    <Routes location={background || location}>
                        <Route path='/react-stellar-burger' element={<MainPage/>}/>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/login' element={<OnlyUnAuth component={<Login/>}/>}/>
                        <Route path='/register' element={<OnlyUnAuth component={<Register/>}/>}/>
                        <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword/>}/>}/>
                        <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword/>}/>}/>
                        <Route path='*' element={<Error404/>}/>
                        <Route path='/ingredients/:ingredientId' element={<IngredientPage/>}/>
                        <Route path='/feed' element={<Feed/>}/>
                        <Route path='/feed/:id' element={<FeedDetailsPage/>}/>
                        <Route path='/profile' element={<OnlyAuth component={<Profile children={<ProfileInfo/>}/>}/>}/>
                        <Route path='/profile/order'
                               element={<OnlyAuth component={<Profile children={<ProfileOrder/>}/>}/>}/>
                        <Route path='/profile/order/:id' element={<OnlyAuth component={<ProfileOrderDetiles/>}/>}/>

                    </Routes>
                    {background && (
                        <Routes>
                            <Route
                                path='/ingredients/:ingredientId'
                                element={
                                    <Modal modalActive setModalActive={handleModalClose}>
                                        <IngredientDetails/>
                                    </Modal>
                                }
                            />
                            <Route
                                path='/feed/:id'
                                element={
                                    <Modal modalActive setModalActive={handleModalClose}>
                                        <ModalFeed/>
                                    </Modal>
                                }
                            />
                            <Route
                                path='/profile/order/:id'
                                element={
                                    <Modal modalActive setModalActive={handleModalClose}>
                                        <ModalOrderUser/>
                                    </Modal>
                                }
                            />
                        </Routes>
                    )}
                </main>
            </DndProvider>
        </div>
    );
}

export default App;
