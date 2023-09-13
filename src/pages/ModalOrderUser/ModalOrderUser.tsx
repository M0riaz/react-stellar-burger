import React, { FC, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { FeedDetails } from "../FeedDetails/FeedDetails";
import style from "./ModalOrderUser.module.css";
import { useSelector } from "../../services/store/typesStore";
import { IOneOrder } from "../../types/order";

export const ModalOrderUser: FC = () => {
    const orders = useSelector((state) => state.orderFeedUserReducer.orders.orders);
    const { id } = useParams();
    const  navigate = useNavigate();
    // @ts-ignore
    const isAuth:boolean = useSelector((state) => state.regNewUser.isAuth);

    // @ts-ignore
    const order: IOneOrder | undefined = orders?.find((order: IOneOrder) => order.number === +id);

    useEffect(() => {
        if (!isAuth) {
            navigate(-1);
        }
    }, [isAuth,  navigate]);

    return (
        <>
            {order && isAuth && (
                <div className={style.main}>
                    <FeedDetails order={order} />
                </div>
            )}
        </>
    );
};