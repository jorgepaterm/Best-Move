import React, {useState} from "react";
import s from './contactos.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {seleccionarChat} from '../../redux/actions';

const Contactos = () => {

    const dispatch = useDispatch();

    const contactos = useSelector(state => state.contactos);
    const chats = useSelector(state => state.chats);
    const usuario = useSelector(state => state.usuario);

    const [state, setState] = useState([
        {nombre: 'jesuan', apellido: 'patermina'},
        {nombre: 'jose', apellido: 'albarez'},
        {nombre: 'albert', apellido: 'gomez'},
        {nombre: 'keli', apellido: 'perez'},
    ])

    const handleClick = (id) => {
        if(chats && chats.length){
            let aux = true;
            chats.forEach(u => {
                 aux && u.users.forEach(e => {
                    if(e === id){
                        dispatch(seleccionarChat({mensajes: u.mensajes, userId2: id}));
                        aux = false;
                        return;
                    }
                });
            });
        }
    }

    return (
        <div className={s.container}>
            <ul className={s.ul}>
                {
                    contactos && contactos.map((e, i) => (
                        
                            <li key={i} onClick={()=>handleClick(e._id)} className={s.li}>{e.nombre} {e.apellido}</li>
                        )
                    )
                }
            </ul>
        </div>
    )
}

export default Contactos;
