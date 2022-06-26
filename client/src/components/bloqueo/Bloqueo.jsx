import React from "react";
import s from './bloqueo.module.css';
import Head from "../head/Head";
import {NavLink} from 'react-router-dom';

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

        </>
    )
}

export default Bloqueo;
