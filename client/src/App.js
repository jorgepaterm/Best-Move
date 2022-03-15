import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from './components/home/Home';
import Head from './components/head/Head';
import Tutoriales from './components/tutoriales/Tutoriales';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Login from './components/auth/Login';
import ConfirmarCorreo from './components/auth/ConfirmarCorreo';
import Chats from './components/chat/Index';
import AgreagarDato from './components/agregarDato/AgregarDato';
import VentanaEmergente from './components/agregarDato/VentanaEmergente';

// import { useJwt } from "react-jwt";
import tokenAuth from './config/tokenAuth';
import {usuarioAutenticado} from './redux/actions';

const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {

  const dispatch = useDispatch();

  const autenticado = useSelector(state => state.autenticado);
  // const cargando = useSelector(state => state.cargando);
  const verificar = useSelector(state => state.verificar);
  // const usuario = useSelector(state => state.usuario);

    // const {decodedToken} = useJwt(token);

  useEffect(() => {

    dispatch(usuarioAutenticado());
  }, []);

  return (
    <BrowserRouter>

      <Head />

      <Routes>

        <Route path='/home' element={<Home />} />
        <Route path='/tutoriales' element={autenticado ? <Tutoriales /> : <Navigate to='/' />} />
        
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
