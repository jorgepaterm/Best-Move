import React from "react";
import s from './contactos.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {traerChat, contactoActual} from '../../redux/actions';

const Contactos = ({setContacto}) => {

    const [userDos, setUserDos] = React.useState(null)

    const dispatch = useDispatch();

    const contactos = useSelector(state => state.contactos);
    const chat = useSelector(state => state.chat);
    const usuario = useSelector(state => state.usuario);

    const handleClick = (chats, userId2, obj) => {
        dispatch(traerChat(chats[0]._id));
        dispatch(contactoActual(userId2));
        setUserDos({
            idChat: chats[0]._id,
            nombre: `${obj.nombre} ${obj.apellido}`
        })
    }

    const [showContactos, setShowContactos] = React.useState(false);
    
    React.useEffect(()=>{
        if(userDos?.idChat === chat?._id){
            setContacto(userDos?.nombre);
        }
    }, [chat])

    return (
        <div className={`${s.container} ${showContactos && s.showContainer}`}>
            <div className={s.contactos} onClick={()=>setShowContactos(!showContactos)}>
                <div className={s.menuBurger}></div>
            </div>

            <ul className={s.ul}>
                {
                    contactos && contactos.map((e, i) => (
                        
                            <li
                                key={i}
                                onClick={()=>handleClick(e.chats, e._id, {nombre: e.nombre, apellido: e.apellido})}
                                className={`${usuario && usuario.chatsNoLeidos?.includes(e.chats[0]._id) ? s.nuevoMensaje : s.li}`}
                            >{e.nombre} {e.apellido}
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    )
}

export default Contactos;
