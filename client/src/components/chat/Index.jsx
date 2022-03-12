import React, {useEffect, useState, useContext} from 'react';
import Chat from './Chat';
import Contactos from './Contactos';
import s from './index.module.css';
import {traerChat, traerContactos, usuarioAutenticado} from '../../redux/actions';
import {socketContext} from '../../config/socket';
import {useSelector, useDispatch} from 'react-redux';

const Chats = () => {

    const socket = useContext(socketContext);
    
    const dispatch = useDispatch();

    const chat = useSelector(state => state.chat);
    const usuario = useSelector(state => state.usuario);

    const [state, setState] = useState(true);
    const [contacto, setContacto] = useState(null);

    useEffect(() => {

        if(state){
            dispatch(traerContactos());
        }

        if(state && usuario?.role === 'user' && usuario.chats.length){
            setState(false);
            dispatch(traerChat(usuario.chats[0]));
        }

        socket.on(`${usuario?._id}`, data => {

            if(usuario.role === 'user'){
                dispatch(traerChat(data.idChat));
            }
            if(data.nuevoContacto){
                console.log('busco nuevo usuario');
                dispatch(traerContactos());
            }
            else if(data.chat?._id === chat?._id){
                dispatch(traerChat(data.idChat));
            }
            if(data.nuevoMensaje){
                dispatch(usuarioAutenticado());
            }
        });

        return () => {socket.off();}
    }, [usuario, socket, chat]);

    return (
        <div className={s.container}>
           {usuario?.role === 'admin' && <Contactos setContacto={setContacto} />}
            <Chat contacto={contacto} />
        </div>
    )
}

export default Chats;
