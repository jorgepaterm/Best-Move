import {
    CREAR_USUARIO,
    AUTENTICAR_USUARIO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION,
    VERIFICAR_CORREO,
    ACTUALIZAR_VERIFICAR,
    ALERTA_ERROR,
    RESET_ERROR,
    TRAER_CHATS,
    SELECCIONAR_CHAT,
} from '../types';

const initialState = {
    usuario: null,
    token: localStorage.getItem('token'),
    autenticado: false,
    cargando: true,
    verificar: null,
    alertaerror: null,
    contactos: null,
    chats: null,
    chatSelecionado: null,
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
            chats: null,
            chatSelecionado: null
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

        case TRAER_CHATS: return {
            ...state,
            contactos: action.payload.usuarios.filter(e => e._id !== state.usuario._id),
            chats: action.payload.chats
        }

        case SELECCIONAR_CHAT: return {
            ...state,
            chatSelecionado: action.payload
        }
        
        default: return state;
    }
}

export default reducer