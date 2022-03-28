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
    TRAER_CONTACTOS,
    CONTACTO_ACTUAL,
    AGREGAR_NUEVO_MENSAJE,

    OBTENER_DATOS,
    AGREGAR_DATO,
    ELIMINAR_DATO,
    EDITAR_DATO,
    CAMBIAR_ESTADO_DATO,

    OBTENER_USUARIOS,
    BLOCK_USER,

    OBTENER_VIDEOS,
} from '../types';

const initialState = {
    usuario: null,
    token: localStorage.getItem('token'),
    autenticado: false,
    cargando: true,
    verificar: null,
    alertaerror: null,
    contactos: null,
    chat: null,
    userId2: null,
    datos: null,
    editardato: false,
    datoActual: null,
    taernotificacion: false,
    usuarios: null,
    msg: null,
    videos: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case CREAR_USUARIO:
        case AUTENTICAR_USUARIO:
        localStorage.setItem('token', action.payload.token);
        return {
            ...state,
            autenticado: true,
            cargando: false,
        }

        case USUARIO_AUTENTICADO: return {
            ...state,
            usuario: action.payload,
            autenticado: action.payload && true,
            cargando: action.payload && false,
        }

        case CERRAR_SESION:
        localStorage.removeItem('token');
        return {
            ...state,
            usuario: null,
            token: null,
            autenticado: false,
            cargando: false,
            alertaerror: null,
            verificar: null,
            contactos: null,
            chat: null,
            userId2: null
        }

        case VERIFICAR_CORREO:
        return {
            ...state,
            usuario: action.payload.usuario,
            verificar: action.payload.num
        }

        case ACTUALIZAR_VERIFICAR: return {
            ...state,
            verificar: action.payload
        }

        case ALERTA_ERROR: return {
            ...state,
            cargando: action.payload.usuarioAutenticado === 'false' && false,
            // autenticado: false,
            alertaerror: action.payload.msg
        }

        case RESET_ERROR: return {
            ...state,
            alertaerror: null
        }

        case TRAER_CONTACTOS: return {
            ...state,
            contactos: action.payload.usuarios.filter(e => e._id !== state.usuario._id)
        }

        case TRAER_CHAT: return {
            ...state,
            chat: action.payload.chat,
            usuario: action.payload.usuario
        }

        case CONTACTO_ACTUAL: return {
            ...state,
            userId2: action.payload
        }

        case AGREGAR_NUEVO_MENSAJE: return {
            ...state,
            chat: state.chat !== null ? {...state.chat, mensajes: [...state.chat.mensajes, action.payload.mensaje]} : action.payload.newChat
        }

        case OBTENER_DATOS: return {
            ...state,
            datos: action.payload
        }

        case AGREGAR_DATO: return {
            ...state,
            datos: [...state.datos, action.payload.dato]
        }

        case ELIMINAR_DATO: return {
            ...state,
            datos: state.datos.filter(e => e._id !== action.payload.id)
        }

        case EDITAR_DATO: return {
            ...state,
            datos: state.datos.map(e => e._id.toString() === action.payload.newDato._id.toString() ? action.payload.newDato : e)
        }

        case CAMBIAR_ESTADO_DATO: return {
            ...state,
            editardato: action.payload.arg,
            datoActual: action.payload.dato
        }

        case OBTENER_USUARIOS: return {
            ...state,
            usuarios: action.payload
        }

        case BLOCK_USER: return {
            ...state,
            usuarios: state.usuarios.map(e => (
                e._id.toString() !== action.payload.usuario._id.toString() ? e : action.payload.usuario
            ))
        }

        case OBTENER_VIDEOS: return {
            ...state,
            videos: action.payload
        }
        
        default: return state;
    }
}

export default reducer