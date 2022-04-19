import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {autenticarUsuario, registroError} from '../../redux/actions';
import s from './login.module.css';
import AlertaError from "../alertaError/AlertaError";

const Login = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    
    const [state, setState] = useState({
        email: '',
        contraseña: ''
    })
    
    const {email, contraseña} = state
    
    const alertaerror = useSelector(state => state.alertaerror);

    useEffect(() => {
        if(alertaerror){
            setLoading(false);
        }
    }, [alertaerror]);

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(!alertaerror){
            setLoading(true);
        }

        // hacer las validaciones
        if(email.trim() === '' || 
        contraseña.trim() === ''){
            return dispatch(registroError('Todos los campos son obligatorios'));
        }

        // enviar formulario
        dispatch(autenticarUsuario({email, password: contraseña}));
    }

    return (
        <>
        <div className={s.container}>
            <div className={s.usuarioForm}>

                <h2 className={s.h2Titulo}>Iniciar sesión</h2>
                <br/>
                <br/>

                <form className={s.form} onSubmit={handleSubmit}>

                    <div className={s.divInput}>
                        {/* <label className={s.label}>Email:</label> */}
                        <input 
                        className={s.input}
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Tu email..." />
                    </div>

                    <div className={s.divInput}>
                        {/* <label className={s.label}>Contraseña:</label> */}
                        <input 
                        className={s.input}
                        type="password"
                        name="contraseña"
                        value={contraseña}
                        onChange={handleChange}
                        placeholder="Escribe una contraseña..." />
                    </div>

                    {
                        !loading
                        
                        ? <input className={s.btn} type='submit' value='Entrar' />
                    
                        : <div className={s.btn}>
                            <div className="loader" />
                        </div>
                    }

                </form>


                <NavLink to='/nueva-cuenta' className={s.NavLink}>Crear una cuenta</NavLink>

            </div>
        </div>

        <AlertaError />

        </>
    )
}

export default Login;
