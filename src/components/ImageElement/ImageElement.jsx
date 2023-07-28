import style from './ImageElement.module.css'
import React, {useEffect, useState, useCallback} from "react";

export const ImageElement = (props) => {
    const {data} = props;
    return (
        data ? (
            <div className={style.imageBox} >
                <img className={style.img} src={data.image} alt={data.name}/>
            </div>
        ) : <div>...</div>
    )
}