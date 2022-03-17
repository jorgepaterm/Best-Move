import React from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {cerrarSesion} from '../../redux/actions';
import { useJwt } from "react-jwt";
import s from './head.module.css';

const token = localStorage.getItem('token');

const Head = () => {

    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const {decodedToken} = useJwt(token);

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
                ?  (
                    <div className={s.enlaces}>
                        <ul className={s.ul}>
                            <li className={s.li}><NavLink className={s.enlace} to='/home'>HOME</NavLink></li>
                            <li className={s.li}><NavLink className={s.enlace} to='/quienes-somos'>QUIENES SOMOS</NavLink></li>
                            <li className={s.li}><NavLink className={s.enlace} to='/datos-del-dia'>DATOS DEL DÍA</NavLink></li>
                            {decodedToken?.usuario.role === 'user' && <li className={s.li}><NavLink className={s.enlace} to='/por-que-registrarme'>¿POR QUÉ REGISTRARME?</NavLink></li>}
                            <li className={s.li}><NavLink className={s.enlace} to='/chat'>{`${decodedToken?.usuario.role === 'admin' ? 'CHAT' : 'ESCRÍBENOS'}`}</NavLink></li>
                            {decodedToken?.usuario.role === 'admin' && <li className={s.li}><NavLink className={s.enlace} to='/agregar-dato'>AGREGAR DATO</NavLink></li>}
                        </ul>

                        <div className={s.divNombre}>
                            <span>Hola {usuario?.nombre}</span>
                            <button onClick={handleClick} >Cerrar sesión</button>
                        </div>
                    </div>
                    )
                : (<div className={s.enlaces}>
                        <ul className={s.ul}>
                            <li className={s.li}><NavLink className={s.enlace} to='/home'>HOME</NavLink></li>
                            <li className={s.li}><NavLink className={s.enlace} to='/quienes-somos'>QUIENES SOMOS</NavLink></li>
                            <li className={s.li}><NavLink className={s.enlace} to='/por-que-registrarme'>¿POR QUÉ REGISTRARME?</NavLink></li>
                        </ul>

                        <ul className={s.ul}>
                            <li className={s.li}><NavLink className={s.enlace} to="/nueva-cuenta">REGÍSTRARME</NavLink></li>
                            <li className={s.li}><NavLink className={s.enlace} to="/">ENTRAR</NavLink></li>
                        </ul>

                    </div>) }
                    
            </div>
            <div className={s.headDos}></div>
        </div>
    )
}

export default Head;
