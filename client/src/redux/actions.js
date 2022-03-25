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

    TRAER_CHAT,
    ENVIAR_MENSAJE,
    TRAER_CONTACTOS,
    CONTACTO_ACTUAL,
    AGREGAR_NUEVO_MENSAJE,

    OBTENER_DATOS,
    AGREGAR_DATO,
    ELIMINAR_DATO,
    EDITAR_DATO,
    CAMBIAR_ESTADO_DATO,

    OBTENER_USUARIOS,
    PASSWORD_EDIT_USER,
    BLOCK_USER,

    OBTENER_VIDEOS,
    AGREGAR_VIDEO,
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

// Traer los chats
export const traerChat = (idChat) => {
    return async (dispatch) => {
        const respuesta = await clienteAxios(`/api/chat/${idChat}`)

        dispatch({
            type: TRAER_CHAT,
            payload: respuesta.data
        })
    }
}

export const addNewMessage = (mensaje, newChat) => {
    return (dispatch) => {

        dispatch({
            type: AGREGAR_NUEVO_MENSAJE,
            payload: {mensaje, newChat}
        })
    }
}

export const enviarMensaje = ({userId2, text, socketId}) => {
    return async (dispatch) => {

        const respuesta = await clienteAxios.post('/api/chat', {userId2, text, socketId});

        dispatch({
            type: ENVIAR_MENSAJE,
            payload: respuesta.data
        })
    }
}

export const traerContactos = () => {
    return async (dispatch) => {
        const respuesta = await clienteAxios('/api/chat');

        dispatch({
            type: TRAER_CONTACTOS,
            payload: respuesta.data
        })
    }
}

export const contactoActual = (id) => {
    return (dispatch) => {

        dispatch({
            type: CONTACTO_ACTUAL,
            payload: id
        })
    }
}

// Datos
export const obtenerDatos = () => {
    return async (dispatch) => {

        try{
            const respuesta = await clienteAxios('/api/dato');
    
            dispatch({
                type: OBTENER_DATOS,
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

export const agregarDato = (datos) => {
    return async (dispatch) => {

        try{
            const respuesta = await clienteAxios.post('/api/dato', datos);
    
            dispatch({
                type: AGREGAR_DATO,
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

export const eliminarDato = id => {
    return async (dispatch) => {

        try{
            const respuesta = await clienteAxios.delete(`/api/dato/${id}`);
    
            dispatch({
                type: ELIMINAR_DATO,
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

export const editarDato = (id, datos) => {
    return async (dispatch) => {

        try{
            const respuesta = await clienteAxios.put(`/api/dato/${id}`, datos);
    
            dispatch({
                type: EDITAR_DATO,
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

export const stateEditarDato = (arg, dato) => {
    return (dispatch) => {
        dispatch({
            type: CAMBIAR_ESTADO_DATO,
            payload: {arg, dato}
        })
    }
}

export const obtenerUsuarios = () => {
    return async (dispatch) => {

        try{
            const respuesta = await clienteAxios('/api/usuarios');
    
            dispatch({
                type: OBTENER_USUARIOS,
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

export const passwordEditUser = (id, newPassword) => {
    return async (dispatch) => {
        
        try{
            const respuesta = await clienteAxios.put('/api/usuarios/password-edit', {id, newPassword});
    
            dispatch({
                type: PASSWORD_EDIT_USER,
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

export const blockUser = (id, bloquear) => {
    return async (dispatch) => {

        try{
            const respuesta = await clienteAxios.put('/api/usuarios', {id, bloquear});

            console.log(respuesta.data)
    
            dispatch({
                type: BLOCK_USER,
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

export const obtenerVideos = () => {
    return async (dispatch) => {

        try{
            const respuesta = await clienteAxios('/api/videos');

            dispatch({
                type: OBTENER_VIDEOS,
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

export const agregarVideo = (title, url) => {
    return async (dispatch) => {

        try{
            const respuesta = await clienteAxios.post('/api/videos', {title, url});

            dispatch({
                type: AGREGAR_VIDEO,
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
