import React from "react";
import IconoChat from "../iconoChat/IconoChat";
import {NavLink} from 'react-router-dom';
import s from './bloqueo.module.css';
import Head from "../head/Head";

const Bloqueo = () => {

    return (
        <>
            <Head />
            <div className={s.container}>
                <div className={s.ventana}>
                    <span className={s.text}>Escriba un mensaje a soporte y solicite la activación</span>
                    <NavLink to='/chat' className={s.navLink}>Soporte</NavLink>
                </div>
            </div>

            <IconoChat />
        </>
    )
}

export default Bloqueo;
