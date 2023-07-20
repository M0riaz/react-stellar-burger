import style from './ImageElement.module.css'
import React from "react";

export const ImageElement = ({img}) => {

    return (
        <div className={style.imageBox}>
            <img className={style.img} src={img.image_mobile} alt={img.name} />
        </div>

    )
}