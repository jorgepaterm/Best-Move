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
import Fondo from './components/fondo/Fondo';
import Bloqueo from './components/bloqueo/Bloqueo';

import tokenAuth from './config/tokenAuth';
import {usuarioAutenticado} from './redux/actions';

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

  // const [userId, setUserId] = React.useState()

  useEffect(() => {
    if(!usuario) dispatch(usuarioAutenticado());
  }, []);

  return (
    <BrowserRouter>
      <Fondo />

      <Routes>
          
          <Route path='/bloqueo' element={usuario?.bloqueado === 'true' ? <Bloqueo /> : <Navigate to='/' /> } />
          
          <Route path='/' element={!autenticado && !cargando ? <Home /> : <Navigate to='/datos-del-dia' />} />
          <Route path='/iniciar-sesion' element={!autenticado && !cargando ? <Login /> : <Navigate to='/datos-del-dia' />} />
          <Route path='/nueva-cuenta' element={!autenticado && !cargando  ? <NuevaCuenta verificar={verificar} /> : <Navigate to='/datos-del-dia' />} />
          <Route path={`/verificar-correo`} element={verificar && !autenticado ? <ConfirmarCorreo/> : <Navigate to='/nueva-cuenta' />} />

          <Route path='/datos-del-dia' element={!cargando  && !autenticado ? <Navigate to='/' /> : <DatosDelDia /> } />

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
