import React, {useState, useEffect} from "react";
import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {crearUsuario, verificarCorreo} from '../../redux/actions';
import {useJwt} from 'react-jwt';
import s from './nuevaCuenta.module.css';

const token = localStorage.getItem('token');

const NuevaCuenta = ({verificar}) => {

    const {decodedToken} = useJwt(token);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // const verificar = useSelector(state => state.verificar);

    if(verificar){
        setTimeout(() => {

            navigate(`/nueva-cuenta/verificar-correo`);
        }, 1000);
    }

    const [state, setState] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        contraseña: '',
        confirmar: ''
    })

    const {nombre, apellido, dni, email, contraseña, confirmar} = state;

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        // hacer las validaciones
        if(nombre.trim() === '' || 
        apellido.trim() === '' || 
        dni.trim() === '' || 
        email.trim() === '' || 
        contraseña.trim() === '' || confirmar.trim() === ''){
            return alert('todos los campos son obligatorios');
        }

        // confirmar que las dos contraseñas sean iguales
        if(contraseña !== confirmar){
            return alert('Las contraseñas deben ser iguales');
        }

        // enviar formulario
        dispatch(verificarCorreo({nombre, apellido, dni, email, password: contraseña}))

        // limpiar el formulario
        // setState({
        //     nombre: '',
        //     apellido: '',
        //     dni: '',
        //     email: '',
        //     contraseña: '',
        //     confirmar: ''
        // })
    }

    return (
        <div className={s.container}>
            <div className={s.usuarioForm}>

                <h2>Crear una cuenta</h2>

                <form className={s.form} onSubmit={handleSubmit}>

                    <div className={s.divInput}>
                        <label className={s.label}>Nombre</label>
                        <input 
                        className={s.input}
                        type="text"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre..." />
                    </div>

                    <div className={s.divInput}>
                        <label className={s.label}>Apellido</label>
                        <input 
                        className={s.input}
                        type="text"
                        name="apellido"
                        value={apellido}
                        onChange={handleChange}
                        placeholder="Tu Apellido..." />
                    </div>

                    <div className={s.divInput}>
                        <label className={s.label}>Documento</label>
                        <input 
                        className={s.input}
                        type="text"
                        name="dni"
                        value={dni}
                        onChange={handleChange}
                        placeholder="Documento de identificación..." />
                    </div>

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

                    <div className={s.divInput}>
                        <label className={s.label}>Confirmar contraseña</label>
                        <input 
                        className={s.input}
                        type="password"
                        name="confirmar"
                        value={confirmar}
                        onChange={handleChange}
                        placeholder="Confirma tu contraseña..." />
                    </div>

                    <input type="submit" className={s.btn} value='Crear cuenta'/>

                </form>


                <NavLink to='/' className={s.NavLink}>Iniciar sesión</NavLink>

            <Outlet />
            </div>


        </div>
    )
}

export default NuevaCuenta;
