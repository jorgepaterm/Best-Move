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
            verificar: action.payload.numCryp
        }

        case ACTUALIZAR_VERIFICAR: return {
            ...state,
            verificar: action.payload
        }

        case ALERTA_ERROR: return {
            ...state,
            cargando: false,
            autenticado: false,
            alertaerror: action.payload
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
        
        default: return state;
    }
}

export default reducer