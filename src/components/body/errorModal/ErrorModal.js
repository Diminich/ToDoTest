import React from "react";
import styles from './errorModal.module.scss'
import {setErrorMessage} from "../../../redux/task-reducer";
import {useDispatch} from "react-redux";

const ErrorModal = ({errorMessage}) => {
    const dispatch = useDispatch();
    const addOk = () => {
        dispatch(setErrorMessage(''))
    }

    return (
        <div className={styles.wrapperErrorModal}>
            <h1 style={{'color': 'red'}}>{errorMessage}</h1>
            <button  className={styles.addOkButton} onClick={addOk}>ok</button>
        </div>
    )
}

export default ErrorModal;