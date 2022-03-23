import React, {useEffect} from 'react';
import s from './tablaUsuarios.module.css';
import {obtenerUsuarios, blockUser} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Routes, useNavigate} from 'react-router-dom';
import VentanaEmergenteEditClave from './VentanaEmergente';
import IconoChat from '../iconoChat/IconoChat';

const TablaUsuarios = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const usuarios = useSelector(state => state.usuarios);

    const onClickBlock = (id, bloquear) => {

        dispatch(blockUser(id, bloquear === 'true' ? 'false' : 'true'));
    }

    const [info, setInfo] = React.useState()
    
    const openInfo = (id) => {
        if(info === id) setInfo(null);
        else setInfo(id);
    }

    const [idUser, setIdUser] = React.useState()

    const abrirVentana = () => {
        navigate('ventana-emergente');
    }

    useEffect(()=> {
        dispatch(obtenerUsuarios());
    }, [])

    return (
        <>
            <Routes>
                <Route path='ventana-emergente' element={<VentanaEmergenteEditClave idUser={idUser} />} />
            </Routes>

            <div className={s.container}>
                <div className={s.tabla}>
                    <div className={`${s.fila} ${s.titulos}`}>
                        <span className={s.creado}>Creado</span>
                        <span className={s.nombre}>Nombre completo</span>
                        {/* <span className={s.apellido}>apellido</span> */}
                        <span className={s.email}>Email</span>
                        <span className={s.dni}>DNI</span>
                        <span className={s.bloqueado}>Bloqueado</span>
                    </div>
                    {
                        usuarios && usuarios.map((e, i) => 
                            <div key={i} className={`${s.fila} ${info === e._id && s.viewInfo}`} onClick={()=>openInfo(e._id)}>
                                <span className={s.creado}>{e.date.slice(0, 10).replaceAll('-', '/')}</span>
                                <span className={s.nombre}>{e.nombre} {e.apellido}</span>
                                {/* <span className={s.apellido}>{e.apellido}</span> */}
                                <span className={s.email}>{e.email}</span>
                                <span className={s.dni}>{e.dni}</span>
                                <span className={s.bloqueado}>{e.bloqueado === 'false' ? 'false' : 'true'}</span>
                                
                                <div className={s.containerBtn}>
                                    <button
                                        className={`${s.btn} ${e.bloqueado === 'false' ? s.btnBlockRed : s.btnBlockGreen}`}
                                        onClick={()=>onClickBlock(e._id, e.bloqueado)}
                                        >
                                        {
                                            e.bloqueado === 'false'
                                            ? <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-dash-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>
                                            : <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>
                                        }
                                    </button>
                                    <button
                                        className={`${s.btn} ${s.btnEdit}`}
                                        onClick={()=>{setIdUser(e._id); abrirVentana()}}
                                        >Editar clave
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <IconoChat />
        </>
    )
}

export default TablaUsuarios;
