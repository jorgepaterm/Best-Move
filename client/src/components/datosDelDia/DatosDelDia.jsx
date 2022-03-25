import React from "react";
import s from './datosDelDia.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {obtenerDatos} from '../../redux/actions';
import IconoChat from '../iconoChat/IconoChat';

const DatosDelDia = () => {

    const dispatch = useDispatch();

    const datos = useSelector(state => state.datos);
    // const usuario = useSelector(state => state.usuario);

    React.useEffect(()=>{
        dispatch(obtenerDatos());
    }, [])

    return (
        <>
            <div className={s.container}>
                {
                    datos && datos.map((e, i) => (
                        <div key={i} className={s.card}>
                            <span className={s.equipos}>{e.equipoUno} - {e.equipoDos}</span>
                            <span className={s.resultado}>{e.resultado}</span>
                            
                            <div className={s.fechaHora}>
                                <span>{e.fechaHora.slice(2, 12).replaceAll('-', '/')}</span>
                                <span>{e.fechaHora.slice(15, e.fechaHora.length)}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
            <IconoChat />
        </>
    )
}

export default DatosDelDia;
