import React, {useState, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {actualizarVerificar, crearUsuario, registroError, autenticarUsuario} from '../../redux/actions';
import s from './login.module.css';
import AlertaError from "../alertaError/AlertaError";

const ConfirmarCorreo = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const verificarcorreo = useSelector(state => state.verificar);
    const usuario = useSelector(state => state.usuario);

    const [loading, setLoading] = useState(false);

    const alertaerror = useSelector(state => state.alertaerror);
    const autenticado = useSelector(state => state.autenticado);

    useEffect(() => {
        if(alertaerror){
            setLoading(false);
        }
    }, [alertaerror, autenticado])

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

        // confirmar que el codigo sea el mismo
        if(state !== verificarcorreo){

            return !alertaerror && dispatch(registroError('Código incorrecto'));
        }

        if(!alertaerror){
            setLoading(true);
        }

        // enviar formulario
        if(usuario.login){
            console.log(usuario.email, usuario);
            dispatch(autenticarUsuario(usuario));
        }
        else {
            dispatch(crearUsuario(usuario));
        }
    }

    let volver = usuario.login ? '/' : '/nueva-cuenta'

    return (
        <>
        <div className={s.container}>
            <div className={s.usuarioForm}>

                <h2 className={s.h2Titulo}>Confirmar correo</h2>

                <form className={s.form} onSubmit={handleSubmit}>

                    <div className={s.divInput}>
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

                <NavLink onClick={handleClick} to={`${volver}`} className={s.NavLink}>No me llegó el codigo</NavLink>

            </div>
        </div>

        <AlertaError />
        </>
    )
}

export default ConfirmarCorreo;
