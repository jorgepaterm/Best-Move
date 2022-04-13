import React, {useState, useEffect} from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {verificarCorreo, registroError} from '../../redux/actions';
// import {useJwt} from 'react-jwt';
import s from './nuevaCuenta.module.css';
import AlertaError from "../alertaError/AlertaError";

// const token = localStorage.getItem('token');

const NuevaCuenta = ({verificar}) => {

    // const {decodedToken} = useJwt(token);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const usuario = useSelector(state => state.usuario);

    if(verificar){
        setTimeout(() => {

            navigate('/verificar-correo');
        }, 500);
    }

    const [loading, setLoading] = useState(false);
    
    const alertaerror = useSelector(state => state.alertaerror);
    useEffect(() => {
        if(alertaerror){
            setLoading(false);
        }
    }, [alertaerror])

    const [state, setState] = useState({
        nombre: usuario?.nombre || '',
        apellido: usuario?.apellido || '',
        dni: usuario?.dni || '',
        email:'',
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

        if(!alertaerror){
            setLoading(true);
        }

        // hacer las validaciones
        if(nombre.trim() === '' || 
        apellido.trim() === '' || 
        dni.trim() === '' || 
        email.trim() === '' || 
        contraseña.trim() === '' || confirmar.trim() === ''){
            return dispatch(registroError('todos los campos son obligatorios'));
        };

        const verificar = /\S+@\S+\.\S+/
        if(verificar.test(email) === false){
            return dispatch(registroError('Email no valido'));
        };

        // Verificar que la contraseña sea minima de 6 caracteres
        if(contraseña.length < 6 || contraseña.length > 12){
            return dispatch(registroError('La contraseña debe tener entre 6 y 12 caracteres'));
        };
        // confirmar que las dos contraseñas sean iguales
        if(contraseña !== confirmar){
            return dispatch(registroError('Las contraseñas deben ser iguales'));
        };

        // enviar formulario
        dispatch(verificarCorreo({nombre, apellido, dni, email, password: contraseña}));
    }

    return (
        <>
        <div className={s.container}>
            <div className={s.usuarioForm}>

                <h2>Crear una cuenta</h2>

                <br />
                <br />

                <form className={s.form} onSubmit={handleSubmit}>

                    <div className={s.divInput}>
                        {/* <label className={s.label}>Nombre:</label> */}
                        <input 
                        className={s.input}
                        type="text"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre..." />
                    </div>

                    <div className={s.divInput}>
                        {/* <label className={s.label}>Apellido:</label> */}
                        <input 
                        className={s.input}
                        type="text"
                        name="apellido"
                        value={apellido}
                        onChange={handleChange}
                        placeholder="Tu Apellido..." />
                    </div>

                    <div className={s.divInput}>
                        {/* <label className={s.label}>Documento:</label> */}
                        <input 
                        className={s.input}
                        type="text"
                        name="dni"
                        value={dni}
                        onChange={handleChange}
                        placeholder="Documento de identificación..." />
                    </div>

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

                    <div className={s.divInput}>
                        {/* <label className={s.label}>Confirmar contraseña:</label> */}
                        <input 
                        className={s.input}
                        type="password"
                        name="confirmar"
                        value={confirmar}
                        onChange={handleChange}
                        placeholder="Confirma tu contraseña..." />
                    </div>

                    {
                        !loading

                        ? <input type="submit" className={s.btn} value='Crear cuenta' />
                    
                        : <div className={s.btn}>
                            <div className="loader" />
                        </div>
                    }

                </form>


                <NavLink to='/' className={s.NavLink}>Iniciar sesión</NavLink>

            </div>
        </div>
        
        <AlertaError />
        
        </>
    )
}

export default NuevaCuenta;
