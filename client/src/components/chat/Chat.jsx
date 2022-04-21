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
            <div className={s.container}>
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
                                    <span className={s.hora}>
                                        {/* Aqui pongo solo la hora y los minutos */}
                                        {e.date.length === 24 ? e.date.slice(10, e.date.length-9) : e.date.slice(10, e.date.length-10)}

                                        {/* esto de abajo es una logica para poner el PM o el AM junto */}
                                        {e.date.slice(18, e.date.length-4)}
                                        {e.date.slice(22, e.date.length-1)}
                                    </span>
                                </div>
                            </div>
                        )
                    )
                }
            </div>

            <form onSubmit={onSubmit} className={s.form}>
                <input
                    className={s.inputText}
                    type="text" value={text}
                    onChange={onChange}
                    placeholder='Escribe un mensaje...'
                />
                <button className={s.inputSubmit} type="submit" >
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/></svg>
                    </div>
                </button>
            </form>

        </div>
    )
}

export default Chat;
