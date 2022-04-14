import React from "react";
import s from './datosDelDia.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {obtenerDatos} from '../../redux/actions';
import IconoChat from '../iconoChat/IconoChat';
import Head from '../head/Head';

const DatosDelDia = () => {

    const dispatch = useDispatch();

    const datos = useSelector(state => state.datos);
    // const usuario = useSelector(state => state.usuario);

    React.useEffect(()=>{
        dispatch(obtenerDatos());
    }, [])

    return (
        <>
            <Head />
            <div className={s.container}>
                {
                    datos && datos.map((e, i) => (
                        <div key={i} className={s.card}>
                            <div className={s.equipos}>
                                <span style={{color: e.equipoUnoColor}}>{e.equipoUno}</span>
                                <span style={{color: e.equipoDosColor}}>{e.equipoDos}</span>
                            </div>
                            
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
