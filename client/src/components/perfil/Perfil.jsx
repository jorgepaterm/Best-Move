import React from "react";
import Nav from "../nav/Nav";
import Head from "../head/Head";
import s from './perfil.module.css';
import {useSelector} from 'react-redux';
// import {NavLink} from 'react-router-dom';

const Perfil = () => {

    const usuario = useSelector(state => state.usuario);

    return (
        <>
            <Head />

            <div className={s.container}>
                <h2 className={s.h2}>Información de usuario</h2>

                <div>
                    <ul className={s.ul}>
                        <li className={s.li}>
                            Nombre de usuario: {usuario?.nombre} {usuario?.apellido}
                        </li>

                        <li className={s.li}>
                            <a href="#">Cambiar clave</a>
                        </li>

                        <li className={s.li}>
                            Cédula: {usuario?.dni}
                        </li>

                        <li className={s.li}>
                            Antigüedad: {usuario?.date.slice(8, 10)}/{usuario?.date.slice(5, 7)}/{usuario?.date.slice(0, 4)}
                        </li>

                        <li className={s.li}>
                            Tiempo restante:
                        </li>
                    </ul>
                </div>

                <div className={s.pagos}>
                    <div>
                        <div className={s.divSvg}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="rgb(47, 151, 47)" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/></svg>
                        </div>
                        <strong>Cargar pago</strong>
                    </div>

                    <div>
                        <div className={s.divSvg}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#F15412" className="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/></svg>
                        </div>
                        <strong>Reversar pago</strong>
                    </div>
                </div>

            </div>

            <Nav />
        </>
    );
}

export default Perfil;
