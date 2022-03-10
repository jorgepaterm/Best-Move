import React, {useEffect} from 'react';
import Chat from './Chat';
import Contactos from './Contactos';
import s from './index.module.css';
import {traerChats} from '../../redux/actions';
import {useDispatch} from 'react-redux';

const Chats = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(traerChats());
    }, []);

    return (
        <div className={s.container}>
            <Contactos />
            <Chat />
        </div>
    )
}

export default Chats;
