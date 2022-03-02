import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {actualizarVerificar, crearUsuario, registroError} from '../../redux/actions';
import bcryptjs from 'bcryptjs';
import s from './login.module.css';
import AlertaError from "../alertaError/AlertaError";

const ConfirmarCorreo = () => {

    const dispatch = useDispatch();

    const verificarcorreo = useSelector(state => state.verificar);
    const usuario = useSelector(state => state.usuario);

    const [loading, setLoading] = useState(false);

    const alertaerror = useSelector(state => state.alertaerror);
    useEffect(() => {
        if(alertaerror){
            setLoading(false);
        }
    }, [alertaerror])

    const [state, setState] = useState('');

    const handleChange = e => {
        setState(e.target.value);
    }

    const handleClick = () => {
        dispatch(actualizarVerificar(null));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        // hacer las validaciones
        if(state.trim() === '' ){
            return dispatch(registroError('Campo vacío'));
        }
        
        // confirmar que los dos codigos sean igual
        const resultado = await bcryptjs.compare(state, verificarcorreo)
        if(!resultado){

            return !alertaerror && dispatch(registroError('Código incorrecto'));
        }

        if(!alertaerror){
            setLoading(true);
        }

        // enviar formulario
        console.log('confirmar correo: ',usuario);
        dispatch(crearUsuario(usuario));
    }

    return (
        <>
        <div className={s.container}>
            <div className={s.usuarioForm}>

                <h2>Confirmar correo</h2>

                <form className={s.form} onSubmit={handleSubmit}>

                    <div className={s.divInput}>
                        <label className={s.label}>Codigo:</label>
                        <input 
                        className={s.input}
                        type="text"
                        name="confirmar"
                        value={state}
                        onChange={handleChange}
                        placeholder="El codigo..." />
                    </div>

                    {
                        !loading

                        ? <input className={s.btn} type='submit' value='Enviar' />
                    
                        : <div className={s.btn}>
                            <div className="loader" />
                        </div>
                    }

                </form>

                <NavLink onClick={handleClick} to='/nueva-cuenta' className={s.NavLink}>No me llegó el codigo</NavLink>

            </div>
        </div>

        <AlertaError />
        </>
    )
}

export default ConfirmarCorreo;
