import React, {useState} from 'react';
import s from './chat.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {enviarMensaje} from '../../redux/actions';
// import {socket} from '../../config/socket';

const Chat = ({contacto}) => {

    const dispatch = useDispatch();

    const usuario = useSelector(state => state.usuario);
    const chat = useSelector(state => state.chat);
    const userId2 = useSelector(state => state.userId2);

    const [text, setText] = useState('');
    // const [fecha, setFecha] = useState([]);

    const onChange = e => {
        setText(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();

        // Hacer validaciones
        if(text.trim() === ''){
            return alert('no puedes enviar un mensaje vacio');
        }
        
        dispatch(enviarMensaje({userId2: userId2 || null, text,/*  socketId: socket.id */}));

        // Limpio el input
        setText('');
    }

    function updateScroll(){
        var element = document.getElementById("containesChat");
        element.scrollTop = element.scrollHeight;
    }

    React.useEffect(()=>{
        if(chat){
            updateScroll()
        }
    }, [chat])

    if(!chat && usuario?.role === 'admin'){
        return (
            <div className={s.containerChat}>
                <h3 style={{margin: 'auto'}}>Seleciona un usuario</h3>
            </div>
        )
    }

    return (
        <div className={s.container}>

            <div className={s.titulo}>
                <h3>{`${contacto || 'Atención al cliente'}`}</h3>
            </div>

            <div className={s.chat} id='containesChat'>
                {
                    chat && chat.mensajes.map((e, i) =>
                        (
                            <div key={i} className={s.containerChat}>
                                <>{i === 0 || chat.mensajes[i].date.slice(0, 9) !== chat.mensajes[i-1].date.slice(0, 9)
                                    ? <span className={s.fecha}>{e.date.slice(0, 9)}</span>
                                    : null}
                                </>

                                <div className={`${e.from === usuario._id ? s.mensajeDerecha: s.mensajeIzquierda}`}>
                                    <span className={s.text}>{e.text}</span>
                                    <span className={s.hora}>{e.date.slice(10, e.date.length-3)}</span>
                                </div>
                            </div>
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
