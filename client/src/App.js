import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useContext} from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './components/home/Home';
import Head from './components/head/Head';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Login from './components/auth/Login';
import ConfirmarCorreo from './components/auth/ConfirmarCorreo';
import Chats from './components/chat/Index';
import AgreagarDato from './components/agregarDato/AgregarDato';
import VentanaEmergente from './components/agregarDato/VentanaEmergente';
import DatosDelDia from './components/datosDelDia/DatosDelDia';

// import { useJwt } from "react-jwt";
import tokenAuth from './config/tokenAuth';
import {usuarioAutenticado} from './redux/actions';

import {socketContext} from './config/socket';

const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {

  const socket = useContext(socketContext);

  const dispatch = useDispatch();

  const autenticado = useSelector(state => state.autenticado);
  // const cargando = useSelector(state => state.cargando);
  const verificar = useSelector(state => state.verificar);
  const usuario = useSelector(state => state.usuario);

  useEffect(() => {
    console.log('entro al useEffect');
    console.log(usuario)
    socket.on(`${usuario?._id}:notificacion`, data => {
      if(data.nuevoMensaje){
        dispatch(usuarioAutenticado());
      }
    });
    
    if(!usuario) dispatch(usuarioAutenticado());

    return () => {socket.off();}

  }, [usuario, socket]);

  return (
    <BrowserRouter>

      <Head />

      <Routes>

        <Route path='/home' element={<Home />} />
        <Route path='/datos-del-dia' element={autenticado ? <DatosDelDia /> : <Navigate to='/' />} />
        
        <Route path='/nueva-cuenta' element={!autenticado ? <NuevaCuenta verificar={verificar} /> : <Navigate to='/home' />} />

        <Route path={`/verificar-correo`} element={verificar && !autenticado ? <ConfirmarCorreo/> : <Navigate to='/nueva-cuenta' />} />

        <Route path='/chat' element={autenticado ? <Chats /> : <Navigate to='/' />} />

        <Route path='/agregar-dato' element={autenticado ? <AgreagarDato /> : <Navigate to='/' />} >
          <Route path='ventana-emergente' element={<VentanaEmergente />} />
        </Route>

        <Route path='/' element={!autenticado ? <Login /> : <Navigate to='/home' />} />
        <Route path='*' element={<h1>Error 404</h1>} />
      
      </Routes>

    </BrowserRouter>
  );
}

export default App;
