import React from "react";
import s from './iconoChat.module.css';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';

const IconoChat = () => {

    const usuario = useSelector(state => state.usuario);

    return (
        <div className={s.containerLink}>
            <NavLink className={`${usuario?.chatsNoLeidos?.length ? s.enlaceChat : s.enlace}`} to='/chat'>
                <div className={s.icono}>
                    <div className={s.tresPuntitos}></div>
                </div>
            </NavLink>
        </div>
    )
}

export default IconoChat;
