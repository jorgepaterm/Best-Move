import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import s from './ventanaEmergente.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {registroError, agregarDato, stateEditarDato, editarDato} from '../../redux/actions';
import AlertaError from "../alertaError/AlertaError";

const VentanaEmergente = () => {

    const dispatch = useDispatch();

    const navigare = useNavigate();

    const cerrar = () => {
        dispatch(stateEditarDato(false));
        navigare('/agregar-dato');
    }

    const editardato = useSelector(state => state.editardato);
    const datoActual = useSelector(state => state.datoActual);

    const [state, setState] = useState({
        equipoUno: '',
        equipoDos: '',
        resultado: '',
        fecha: '',
        hora: '',
        equipoUnoColor: '',
        equipoDosColor: '',
        championg: '',
        liga: ''
    })

    React.useEffect(()=>{
        if(datoActual){
            setState({
                equipoUno: datoActual?.equipoUno,
                equipoDos: datoActual?.equipoDos,
                resultado: datoActual?.resultado,
                fecha: datoActual?.fechaHora.slice(2, 12),
                hora: datoActual?.fechaHora.slice(15, datoActual.fechaHora.length),
                equipoUnoColor: datoActual?.equipoUnoColor,
                equipoDosColor: datoActual?.equipoDosColor,
                championg: datoActual?.championg,
                liga: datoActual?.liga
            })
        }
    }, [datoActual])

    const {equipoUno, equipoDos, resultado, fecha, hora, equipoUnoColor, equipoDosColor, championg, liga} = state;

    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        
        if(editardato) {
            dispatch(editarDato(datoActual._id, state));
            navigare('/agregar-dato');
            return;
        }
        if(equipoUno.trim() === '' ||
            equipoDos.trim() === '' ||
            resultado.trim() === '' ||
            equipoUnoColor.trim() === '' ||
            equipoDosColor.trim() === '' ||
            championg.trim() === '' ||
            liga.trim() === '' ||
            fecha.trim() === '' || hora.trim() === ''){
                 return dispatch(registroError('Todos los campos son obligatorios'));
        }

        if(!editardato){
            dispatch(agregarDato(state));
        }

        navigare('/agregar-dato');

    }

    return (
        <>
            <AlertaError />
            <div className={s.container}>
                <div className={s.ventana}>
                    <div className={s.header}>
                        <h3>{`${editardato ? 'Editar dato' : 'Agregar nuevo dato'}`}</h3>
                    </div>
                    
                    <form className={s.cuerpo} onSubmit={onSubmit}>

                        <div className={s.divInput}>
                            <label>Championg:</label>
                            <input type="text" name="championg" value={championg} onChange={onChange} placeholder="championg..." />
                        </div>

                        <div className={s.divInput}>
                            <label>Liga:</label>
                            <input type="text" name="liga" value={liga} onChange={onChange} placeholder="liga..." />
                        </div>

                        
                        <div className={s.divInput}>
                            <label>Equipo 1:</label>
                            <div>

                                <input type="text" name="equipoUno" value={equipoUno} onChange={onChange} placeholder="Equipo 1..." />
                                <select name="equipoUnoColor" value={equipoUnoColor !== '' ? equipoUnoColor : null} onChange={onChange}>
                                    <option value="seleccionar" selected disabled>Seleccionar</option>
                                    <option value="#fff">Blanco</option>
                                    <option value="red">Rojo</option>
                                    <option value="yellow">Amarillo</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className={s.divInput}>
                            <label>Equipo 2:</label>
                            <div>
                                <input type="text" name="equipoDos" value={equipoDos} onChange={onChange} placeholder="Equipo 2..." />
                                <select name="equipoDosColor" value={equipoDosColor !== '' ? equipoDosColor : null} onChange={onChange}>
                                    <option value="seleccionar" selected disabled>Seleccionar</option>
                                    <option value="#00B4D8">Azul</option>
                                    <option value="red">Rojo</option>
                                    <option value="yellow">Amarillo</option>
                                </select>
                            </div>
                        </div>
                    
                        <div className={s.divInput}>
                            <label>Resultados:</label>
                            <input type="text" name="resultado" value={resultado} onChange={onChange} placeholder="resultados..." />
                        </div>
                        
                        <div className={s.divInput}>
                            <label>Fecha:</label>
                            <input type="date" name="fecha" value={fecha} onChange={onChange} />
                        </div>
                        
                        <div className={s.divInput}>
                            <label>Hora:</label>
                            <input type="time" name="hora" value={hora} onChange={onChange} />
                        </div>

                        <div className={s.foot}>
                            <button className={s.btnAgregar} type='submit'>{`${editardato ? 'Aceptar' : 'Agregar'}`}</button>
                            <button className={s.btnCerrar} onClick={cerrar}>Cerrar</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default VentanaEmergente;
