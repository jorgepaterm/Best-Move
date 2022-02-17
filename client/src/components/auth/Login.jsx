import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {autenticarUsuario} from '../../redux/actions';
import s from './login.module.css';

const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [state, setState] = useState({
        email: '',
        contraseña: ''
    })

    const {email, contraseña} = state

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        // hacer las validaciones
        if(email.trim() === '' || 
        contraseña.trim() === ''){
            return alert('todos los campos son obligatorios');
        }

        // enviar formulario
        dispatch(autenticarUsuario({email, password: contraseña}))

        // limpiar el formulario
        setState({
            email: '',
            contraseña: ''
        })

        alert('el usuario no existe');

        navigate('/home');
    }

    return (
        <div className={s.container}>
            <div className={s.usuarioForm}>

                <h2>Iniciar sesión</h2>

                <form className={s.form} onSubmit={handleSubmit}>

                    <div className={s.divInput}>
                        <label className={s.label}>Email</label>
                        <input 
                        className={s.input}
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Tu email..." />
                    </div>

                    <div className={s.divInput}>
                        <label className={s.label}>Contraseña</label>
                        <input 
                        className={s.input}
                        type="password"
                        name="contraseña"
                        value={contraseña}
                        onChange={handleChange}
                        placeholder="Escribe una contraseña..." />
                    </div>

                    <input className={s.btn} type='submit' value='Entrar' />

                </form>


                <NavLink to='/nueva-cuenta' className={s.NavLink}>Crear una cuenta</NavLink>

            </div>
        </div>
    )
}

export default Login;
