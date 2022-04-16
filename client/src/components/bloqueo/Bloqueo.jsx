import React from "react";
import IconoChat from "../iconoChat/IconoChat";
import s from './bloqueo.module.css';
import Head from "../head/Head";

const Bloqueo = () => {

    return (
        <>
            <Head />
            <div className={s.container}>
                <div className={s.ventana}>
                    <span className={s.text}>Informar al administrador que te de acceso a los datos</span>
                </div>
            </div>

            <IconoChat />
        </>
    )
}

export default Bloqueo;
