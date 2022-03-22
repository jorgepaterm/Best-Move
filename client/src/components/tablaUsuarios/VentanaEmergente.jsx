import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import s from './ventanaEmergente.module.css';
import {useDispatch} from 'react-redux';
import {passwordEditUser} from '../../redux/actions';
import AlertaError from "../alertaError/AlertaError";

const VentanaEmergenteEditClave = ({idUser}) => {

    const dispatch = useDispatch();

    const navigare = useNavigate();

    const cerrar = () => {
        navigare('/tabla-usuarios');
    }

    const [state, setState] = useState()

    const onChange = e => {
        setState(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();

        if(state.trim() === ''){
            return alert('Compo incompleto');
        }

        dispatch(passwordEditUser(idUser, state));
        navigare('/tabla-usuarios');
    }

    return (
        <>
            <AlertaError />
            <div className={s.container}>
                <div className={s.ventana}>

                    <div className={s.header}>
                        <h3>Editar clave</h3>
                    </div>

                    <form onSubmit={onSubmit} className={s.cuerpo}>
                        <input
                            type="text"
                            placeholder="Nueva clave"
                            onChange={onChange}
                            className={s.input}
                        />

                        <div className={s.foot}>
                            <button className={s.btnAgregar} type='submit'>Aceptar</button>
                            <button className={s.btnCerrar} onClick={cerrar}>Cerrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default VentanaEmergenteEditClave;