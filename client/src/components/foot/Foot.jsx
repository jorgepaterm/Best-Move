import React from "react";
import {NavLink} from 'react-router-dom';
import s from './foot.module.css';

const Foot = () => {

    return (
        <div className={s.foot}>

            <div className={s.enlaces}>
                <ul className={s.ul}>
                    <li className={s.li}><NavLink className={s.enlace} to='/home'>HOME</NavLink></li>
                    <li className={s.li}><NavLink className={s.enlace} to='/quienes-somos'>QUIENES SOMOS</NavLink></li>
                    <li className={s.li}><NavLink className={s.enlace} to='/tutoriales'>TUTORIALES</NavLink></li>
                    <li className={s.li}><NavLink className={s.enlace} to='/por-que-registrarme'>¿POR QUÉ REGISTRARME?</NavLink></li>
                </ul>
            </div>

            <div className={s.span}>
                <NavLink className={s.enlace} to='/escribenos'> ESCRÍBENOS </NavLink>
            </div>

        </div>
    )
};

export default Foot;
