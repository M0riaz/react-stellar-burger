import style from './ImageElement.module.css'
import React, {useEffect, useState, useCallback, FC} from "react";
import {IIngredient} from "../../types/ingridient";

interface IImgElProps {
    data: IIngredient
}

export const ImageElement: FC<IImgElProps> = (props) => {
    const {data} = props;
    return (
        data ? (
            <div className={style.imageBox} >
                <img className={style.img} src={data.image} alt={data.name}/>
            </div>
        ) : <div>...</div>
    )
}