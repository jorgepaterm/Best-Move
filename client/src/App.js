import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './components/home/Home';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Login from './components/auth/Login';
import ConfirmarCorreo from './components/auth/ConfirmarCorreo';
import Chats from './components/chat/Index';
import AgreagarDato from './components/agregarDato/AgregarDato';
import VentanaEmergente from './components/agregarDato/VentanaEmergente';
import DatosDelDia from './components/datosDelDia/DatosDelDia';
import TablaUsuarios from './components/tablaUsuarios/TablaUsuarios';
import Tutoriales from './components/tutoriales/Tutoriales';
import Fondo from './components/fondo/Fondo';

// import { useJwt } from "react-jwt";
import tokenAuth from './config/tokenAuth';
import {usuarioAutenticado} from './redux/actions';

// import {socketContext} from './config/socket';

const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {

  // const socket = useContext(socketContext);

  const dispatch = useDispatch();

  const autenticado = useSelector(state => state.autenticado);
  const cargando = useSelector(state => state.cargando);
  const verificar = useSelector(state => state.verificar);
  const usuario = useSelector(state => state.usuario);

  const [userId, setUserId] = React.useState()
  const [roleUser, setRoleUser] = React.useState()
  const [bloqueado, setBloqueado] = React.useState()

  useEffect(() => {
    if(!usuario) dispatch(usuarioAutenticado());

  }, []);

  useEffect(()=>{
    if(usuario && usuario._id !== userId) {
      setUserId(usuario._id);
      setRoleUser(usuario.role)
      setBloqueado(usuario.bloqueado)
    }
  }, [usuario]);

  return (
    <BrowserRouter>

      <Fondo />

      {/* <Head userId={userId} roleUser={roleUser} bloqueado={bloqueado}/> */}

      <Routes>

        <Route path='/' element={!autenticado && !cargando ? <Login /> : <Navigate to='/home' />} />
        <Route path='/nueva-cuenta' element={!autenticado && !cargando  ? <NuevaCuenta verificar={verificar} /> : <Navigate to='/home' />} />
        
        <Route path='/home' element={!cargando  && !autenticado ? <Navigate to='/' /> : <Home />} />

        <Route path='/datos-del-dia' element={!cargando  && !autenticado ? <Navigate to='/' /> : <DatosDelDia /> } />

        <Route path='/tutoriales' element={!cargando && !autenticado ? <Navigate to='/' /> : <Tutoriales /> } />
        
        <Route path={`/verificar-correo`} element={verificar && !autenticado ? <ConfirmarCorreo/> : <Navigate to='/nueva-cuenta' />} />

        <Route path='/chat' element={!cargando && !autenticado ? <Navigate to='/' /> : <Chats /> } />

        <Route path='/tabla-usuarios/*' element={!autenticado && !cargando && usuario?.role !== 'admin' ? <Navigate to='/' /> : <TablaUsuarios /> } />

        <Route path='/agregar-dato' element={!autenticado && !cargando && usuario?.role !== 'admin' ? <Navigate to='/' /> : <AgreagarDato /> } >
          <Route path='ventana-emergente' element={<VentanaEmergente />} />
        </Route>

        <Route path='/no-autorizado' element={<h1>Usuario no autorizado</h1>} />
        
        <Route path='*' element={<h1>Error 404</h1>} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
