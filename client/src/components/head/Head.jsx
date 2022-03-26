import React, {useContext} from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {cerrarSesion, usuarioAutenticado} from '../../redux/actions';
import { useJwt } from "react-jwt";
import s from './head.module.css';
import {socketContext} from '../../config/socket';

const token = localStorage.getItem('token');

const Head = () => {

    const socket = useContext(socketContext);

    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const {decodedToken} = useJwt(token);

    const usuario = useSelector(state => state.usuario);
    const autenticado = useSelector(state => state.autenticado);

    const handleClick = () => {
        setShowMenu(false);
        dispatch(cerrarSesion());
        navigate('/');
    }

    const onClickTraerNotif = () => {
        dispatch(usuarioAutenticado());
    }

    const [showMenu, setShowMenu] = React.useState(false);

    return (
        <div>
            <div className={s.head}>

                {usuario && autenticado
                ?  (
                    <div className={s.enlaces}>
                        <ul className={s.ul}>
                            <li className={s.li}>
                                <NavLink className={s.enlace} onClick={onClickTraerNotif} to='/home'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/><path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/></svg>
                                </NavLink>
                            </li>
                        </ul>

                        <div className={s.divNombre}>
                            {/* <li className={s.li}><NavLink className={`${usuario.chatsNoLeidos.length ? s.enlaceChat : s.enlace}`} to='/chat'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16"><path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/></svg></NavLink></li> */}
                            <span>Hola {usuario?.nombre}</span>
                            <div className={s.divMenu} onClick={()=>setShowMenu(!showMenu)}><div className={s.menuBurger}/></div>
                            
                            <ul className={`${s.menu} ${!showMenu && s.menuHidden} ${usuario.role === 'user' && s.heightMenu}`}>
                                <li className={s.li}><NavLink className={s.enlace} onClick={()=>{setShowMenu(false); onClickTraerNotif();}} to='/datos-del-dia'>DATOS</NavLink></li>
                                <li className={s.li} onClick={()=>{setShowMenu(false); onClickTraerNotif();}} ><NavLink className={s.enlace} to='/tutoriales'>TUTORIALES</NavLink></li>
                                
                                {
                                    usuario?.role === 'admin'
                                    && <>
                                        <li className={s.li} onClick={()=>{setShowMenu(false); onClickTraerNotif();}} ><NavLink className={s.enlace} to='/agregar-dato'>AGREGAR DATO</NavLink></li>
                                        <li className={s.li} onClick={()=>{setShowMenu(false); onClickTraerNotif();}} ><NavLink className={s.enlace} to='/tabla-usuarios'>TABLA USUARIOS</NavLink></li>
                                    </>
                                }
                                
                                <li onClick={handleClick} className={`${s.li} ${s.btn}`}>Cerrar sesión</li>
                            </ul>
                        </div>
                    </div>
                    )
                : (<div className={s.enlaces}>
                        <ul className={s.ul}>
                            <li className={s.li}>
                                <NavLink className={s.enlace} to='/home'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/><path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/></svg>
                                </NavLink>
                            </li>

                            {/* <li className={s.li}><NavLink className={s.enlace} to='/quienes-somos'>QUIENES SOMOS</NavLink></li> */}
                            {/* <li className={s.li}><NavLink className={s.enlace} to='/por-que-registrarme'>¿POR QUÉ REGISTRARME?</NavLink></li> */}
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
