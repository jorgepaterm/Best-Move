import clienteAxios from '../config/axios';
import tokenAuth from '../config/tokenAuth';
import {
    CREAR_USUARIO,
    AUTENTICAR_USUARIO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION,
    VERIFICAR_CORREO,
    ACTUALIZAR_VERIFICAR,
} from '../types';

export const crearUsuario = usuario => {
    return async (dispatch) => {

        try{

            const respuesta = await clienteAxios.post('/api/usuarios?verificado=true', usuario);

            dispatch({
                type: CREAR_USUARIO,
                payload: respuesta.data
            })

            dispatch(usuarioAutenticado());

        }
        catch(err){
            console.log(err)
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
            console.log(err);
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
            console.log(err);
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

        const respuesta = await clienteAxios.post('/api/usuarios', usuario);

        if(respuesta.data.token){
            console.log('entrooooo')
            tokenAuth(respuesta.data.token);
        }

        dispatch({
            type: VERIFICAR_CORREO,
            payload: respuesta.data
        })
    }
}

// export const actualizarVerificar = num => {
//     return (dispatch) => {
//         dispatch({
//             type: ACTUALIZAR_VERIFICAR,
//             payload: num
//         })
//     }
// }
