import React from "react";
import s from './home.module.css';
import IconoChat from '../iconoChat/IconoChat';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const usuario = useSelector(state => state.usuario);

    React.useEffect(()=>{
        if(usuario?.bloqueado === 'true') navigate('/no-autorizado');
    }, [usuario]);

    return (
        <>
            <div className={s.fondo}></div>
            <IconoChat />
        </>
    )
};

export default Home;
