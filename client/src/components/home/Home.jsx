import React, {useState} from "react";
import s from './home.module.css';
import IconoChat from '../iconoChat/IconoChat';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Head from '../head/Head';
import imagenUno from './images/imagen1.jpeg';
import imagenDos from './images/imagen2.jpeg';
import imagenTres from './images/imagen3.jpeg';
import imagenCuatro from './images/imagen4.jpeg';
import imagenCinco from './images/imagen5.jpeg';

const Home = () => {

    const navigate = useNavigate();

    const autenticado = useSelector(state => state.autenticado);

    const [posicion, setPosicion] = useState(1);

    const arrayImagenes = [
        imagenUno,
        imagenDos,
        imagenTres,
        imagenCuatro,
        imagenCinco
    ]

    
    React.useEffect(()=>{

        setInterval(() => {
            setPosicion(p => p === arrayImagenes.length-1 ? 0 : p + 1);
    
        }, 3000)
    }, []);

    return (
        <>

            {
                autenticado
                ? <>
                <Head />
                
                <div className={s.container}>

                    <div className={s.carousel}>
                        <div>
                            <img className={s.imgLeft} src={posicion === 0 ? arrayImagenes[arrayImagenes.length-1] : arrayImagenes[posicion-1]} alt="imagen de anuncio" />
                        </div>
                        
                        <div className={s.divImg}>
                            <img className={s.imgCenter} src={arrayImagenes[posicion]} alt="imagen de anuncio" />
                        </div>
                        
                        <div>
                            <img className={s.imgRight} src={posicion === arrayImagenes.length-1 ? arrayImagenes[0] : arrayImagenes[posicion+1]} alt="imagen de anuncio" />
                        </div>
                    </div>
                    
                </div>

                <IconoChat />
                </>

                : null
            }

        </>
    )
};

export default Home;
