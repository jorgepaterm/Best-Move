import React, {useState} from 'react';
import s from './chat.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {enviarMensaje} from '../../redux/actions';

const Chat = () => {

    const dispatch = useDispatch();

    // const usuario = '622009be1a281c404037aef3'
    const usuario = useSelector(state => state.usuario);
    const chats = useSelector(state => state.chats);
    const contactos = useSelector(state => state.contactos);
    const chatSelecionado = useSelector(state => state.chatSelecionado);

    // console.log(usuario, chats, contactos);

    const [text, setText] = useState('');

    const onChange = e => {
        setText(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();

        // Hacer validaciones

        console.log('dispatch')
        dispatch(enviarMensaje({userId2: chatSelecionado.userId2, text}));

        // Limpio el input
        setText('');
    }

    return (
        <div className={s.container}>

            <div className={s.titulo}>
                <h3>Atención al cliente</h3>
            </div>

            <div className={s.chat}>
                {
                    chatSelecionado && chatSelecionado.mensajes.map((e, i) =>
                        (
                            e.from === usuario._id

                            ? <span key={i} className={s.mensajeDerecha}>{e.text}</span>

                            : <span key={i} className={s.mensajeIzquierda}>{e.text}</span>
                        )
                        
                    )
                }
            </div>

            <form onSubmit={onSubmit} className={s.form}>
                <input
                    className={s.input}
                    type="text" value={text}
                    onChange={onChange}
                    placeholder='Escribe un mensaje...'
                />
                <input className={s.inputSubmit} type="submit" value='enviar' />
            </form>

        </div>
    )
}

export default Chat;
