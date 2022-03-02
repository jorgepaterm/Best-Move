import React from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {cerrarSesion} from '../../redux/actions';
import s from './head.module.css';

const Head = () => {

    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const usuario = useSelector(state => state.usuario);
    const autenticado = useSelector(state => state.autenticado);

    const handleClick = () => {
        dispatch(cerrarSesion());
        navigate('/');
    }

    return (
        <div>
            <div className={s.head}>

                {usuario && autenticado
                ?  (<div className={s.divNombre}>
                        <span>Hola {usuario.nombre}</span>
                        <button onClick={handleClick} >Cerrar sesión</button>
                    </div>
                    )
                : (<ul className={s.ul}>
                        <li className={s.li}><NavLink className={s.enlace} to="/nueva-cuenta">REGÍSTRARME</NavLink></li>
                        <li className={s.li}><NavLink className={s.enlace} to="/">ENTRAR</NavLink></li>
                    </ul>) }
                    
            </div>
            <div className={s.headDos}></div>
        </div>
    )
}

export default Head;
