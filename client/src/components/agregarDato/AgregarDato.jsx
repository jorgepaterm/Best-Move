import React from 'react';
import {Outlet, NavLink, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {obtenerDatos, eliminarDato, stateEditarDato} from '../../redux/actions';
import s from './agregarDato.module.css';
import IconoChat from '../iconoChat/IconoChat';

const AgreagarDato = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const datos = useSelector(state => state.datos);

    const quitarTado = id => {
        dispatch(eliminarDato(id))
    }

    const combiarEstadoDato = (dato) => {
        dispatch(stateEditarDato(true, dato));
        navigate('ventana-emergente')
    }

    React.useEffect(()=>{
        dispatch(obtenerDatos());
    }, [])

    return (
        <>
            <Outlet/>
            <div className={s.container}>
                <NavLink className={s.agregarDato} to='ventana-emergente'>Agregar nuevo dato</NavLink>
                <div className={s.tabla}>
                    <div className={s.fila}>
                        <span className={s.equipos}>Equipos</span>
                        <span className={s.resultados}>Resultados</span>
                        <span className={s.fechaHora}>Fecha y hora</span>
                        <div></div>
                    </div>
                    {
                        datos && datos.map((e, i) => (
                            <div key={i} className={s.fila}>
                                <span className={s.equipos}>{e.equipoUno} - {e.equipoDos}</span>
                                <span className={s.resultados}>{e.resultado}</span>
                                <span className={s.fechaHora}>{e.fechaHora.slice(2, 12)} {e.fechaHora.slice(15, e.fechaHora.length)}</span>
                                
                                <div>
                                    <button className={`${s.btn} ${s.btnEditar}`} onClick={()=>combiarEstadoDato(e)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
                                    </button>
                                    <button className={`${s.btn} ${s.btnEliminar}`} onClick={()=>quitarTado(e._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/><path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <IconoChat />
        </>
    )
}

export default AgreagarDato;
