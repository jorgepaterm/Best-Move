import React from "react";
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import s from './tutoriales.module.css';
import IconoChat from "../iconoChat/IconoChat";
import Head from '../head/Head';

const Tutoriales = () => {

    const navigate = useNavigate();

    const bloqueado = useSelector(state => state.bloqueado);

    React.useEffect(()=>{
        if(bloqueado === 'true'){
            navigate('/bloqueo')
        }
    }, [bloqueado])

    return (
        <>
            <Head />
            {/* <div className={s.fondo}></div> */}
            <div className={s.container}>
                {/* <iframe className={s.video} src="https://www.youtube.com/embed/P1OC0ICplMg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
            </div>
            <IconoChat />
        </>
    )
};

export default Tutoriales;
