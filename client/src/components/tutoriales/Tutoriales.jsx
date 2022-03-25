import React from "react";
import s from './tutoriales.module.css';
import IconoChat from "../iconoChat/IconoChat";

const Tutoriales = () => {

    return (
        <>
            {/* <div className={s.fondo}></div> */}
            <div className={s.container}>
                <iframe className={s.video} src="https://www.youtube.com/embed/P1OC0ICplMg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <IconoChat />
        </>
    )
};

export default Tutoriales;
