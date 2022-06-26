import React, {useContext, useEffect} from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {cerrarSesion, usuarioAutenticado, addNewMessage, traerContactos, estadoBloqueo} from '../../redux/actions';
// import { useJwt } from "react-jwt";
import s from './head.module.css';
import {socketContext} from '../../config/socket';

const Head = () => {

    const socket = useContext(socketContext);

    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const usuario = useSelector(state => state.usuario);
    const autenticado = useSelector(state => state.autenticado);
    const chat = useSelector(state => state.chat);
    const role = useSelector(state => state.role);
    const userId = useSelector(state => state.userId);

    const handleClick = () => {
        setShowMenu(false);
        dispatch(cerrarSesion());
        navigate('/');
    }

    useEffect(()=>{

        socket.on(`${userId}:registro`, () => {
            dispatch(cerrarSesion());
        })

        socket.on(`${userId}:noti`, data => {
            estadoBloqueo(data.bloqueado);
        })

        socket.on(`${userId}:noti`, () => {
            dispatch(usuarioAutenticado());
        })

        socket.on(`${userId}`, data => {

            if(role === 'user'){
                dispatch(addNewMessage(data.mensajes, data.newChat));
            }
            if(data.nuevoMensaje){
                dispatch(usuarioAutenticado());
            }
            if(data.nuevoContacto){
                console.log('busco nuevo usuario');
                dispatch(traerContactos());
            }
            else if(data.chat?._id === chat?._id && role === 'admin'){
                dispatch(addNewMessage(data.mensajes, data.newChat));
            }
        });

        return () => {socket.off();}
    }, [socket, userId, role, chat]);

    const [showMenu, setShowMenu] = React.useState(false);

    return (
        <div>
            <div className={s.head}>

                {usuario && autenticado
                ?  (
                    <div className={s.enlaces}>
                        <ul className={s.ul}>
                            {
                                usuario?.bloqueado === 'false'
                                && <li className={s.divMenu} onClick={()=>setShowMenu(!showMenu)}>
                                    <div className={s.menuBurger}/>
                                </li>
                            }

                            {showMenu && <div onClick={()=>setShowMenu(false)} className={s.cerrarMenu} />}
                            
                            <ul className={`${s.menu} ${!showMenu && s.menuHidden} ${usuario.role === 'user' && s.heightMenu}`}>
                                <li className={s.li}><NavLink className={s.enlace} onClick={()=>setShowMenu(false)} to='/datos-del-dia'>DATOS</NavLink></li>
                                
                                {
                                    usuario?.role === 'admin'
                                    && <>
                                        <li className={s.li} onClick={()=>setShowMenu(false)} ><NavLink className={s.enlace} to='/agregar-dato'>AGREGAR DATO</NavLink></li>
                                        <li className={s.li} onClick={()=>setShowMenu(false)} ><NavLink className={s.enlace} to='/tabla-usuarios'>TABLA USUARIOS</NavLink></li>
                                    </>
                                }
                                
                                <li onClick={handleClick} className={`${s.li} ${s.btn}`}>Cerrar sesión</li>
                            </ul>

                            <li className={s.li}>
                                <NavLink className={s.enlace} to='/datos-del-dia'>
                                    <span className={s.saludo}>Best Move</span>
                                </NavLink>
                            </li>
                        </ul>

                        <div className={s.divNombre}>
                            <span className={s.saludo}>Hola {usuario?.nombre}</span>
                            <span className={s.stadoActivo}>Activo</span>
                        </div>
                    </div>
                    )
                : (null) }
                    
            </div>
            <div className={s.headDos}></div>
        </div>
    )
}

export default Head;
