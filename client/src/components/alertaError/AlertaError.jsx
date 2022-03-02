import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {resetError} from '../../redux/actions';
import s from './alertaError.module.css';

const AlertaError = () => {

    const dispatch = useDispatch();

    const alertaerror = useSelector(state => state.alertaerror)

    useEffect(() => {
        if(alertaerror){
            setTimeout(() => {
                dispatch(resetError())
            }, 5500)
        }
    }, [alertaerror])

    return (
        <div className={`${s.divError} ${alertaerror && s.animacion}`}>
            <h3>{alertaerror}</h3>
        </div>
    )
}

export default AlertaError;
