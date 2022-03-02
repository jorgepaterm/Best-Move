import clienteAxios from '../config/axios';
import tokenAuth from '../config/tokenAuth';
import {
    CREAR_USUARIO,
    AUTENTICAR_USUARIO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION,
    VERIFICAR_CORREO,
    ACTUALIZAR_VERIFICAR,
    ALERTA_ERROR,
    RESET_ERROR,
} from '../types';

export const crearUsuario = usuario => {
    return async (dispatch) => {

        console.log('action: ', usuario);
        try{

            const respuesta = await clienteAxios.post('/api/usuarios?verificado=true', usuario);

            dispatch({
                type: CREAR_USUARIO,
                payload: respuesta.data
            })

            dispatch(usuarioAutenticado());

        }
        catch(err){
            dispatch({
                type: ALERTA_ERROR,
                payload: err.response.data.msg
            })
        }
    }
}

export const autenticarUsuario = usuario => {
    return async (dispatch) => {
        try{

            const respuesta = await clienteAxios.post('/api/auth', usuario)

            dispatch({
                type: AUTENTICAR_USUARIO,
                payload: respuesta.data
            })

            dispatch(usuarioAutenticado());
        }
        catch(err){
            dispatch({
                type: ALERTA_ERROR,
                payload: err.response.data.msg
            })
        }
    }
}

export const usuarioAutenticado = () => {
    return async (dispatch) => {

        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }

        try{
            const respuesta = await clienteAxios.get('/api/auth');

            dispatch({
                type: USUARIO_AUTENTICADO,
                payload: respuesta.data
            })
        }
        catch(err){
            dispatch({
                type: ALERTA_ERROR,
                payload: err.response.data.msg
            })
        }
    }
}

export const cerrarSesion = () => {
    return (dispatch) => {
        dispatch({
            type: CERRAR_SESION
        })
    }
}

export const verificarCorreo = (usuario) => {
    return async (dispatch) => {

        try{

            const respuesta = await clienteAxios.post('/api/usuarios', usuario);
    
            if(respuesta.data.token){
                tokenAuth(respuesta.data.token);
            }
    
            respuesta.data.usuario = usuario;
    
            dispatch({
                type: VERIFICAR_CORREO,
                payload: respuesta.data
            })
        }
        catch(err){
            dispatch({
                type: ALERTA_ERROR,
                payload: err.response.data.msg
            })
        }

    }
}

export const actualizarVerificar = arg => {
    return (dispatch) => {
        dispatch({
            type: ACTUALIZAR_VERIFICAR,
            payload: arg
        })
    }
}

export const resetError = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_ERROR,
            payload: null
        })
    }
}

export const registroError = msg => {
    return (dispatch) => {
        dispatch({
            type: ALERTA_ERROR,
            payload: msg
        })
    }
}
