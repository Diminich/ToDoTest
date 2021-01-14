import React, {useState} from 'react';
import styles from './TitleTask.module.scss'
import {useDispatch} from "react-redux";
import {requestAddTask} from "../../../redux/task-reducer";

const TitleTask = () => {
    const [titleTask, setTitleTask] = useState('');
    const [error, setError] = useState(false)
    const dispatch = useDispatch();

    const addTask = () => {
        if (titleTask.trim() !== '') {
            dispatch(requestAddTask(titleTask));
            setTitleTask('');
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <div className={styles.wrapperTitleTask}>
            <div className={styles.wrapperInputErrorMessage}>
                <input className={error ? styles.errorInput : styles.inputTitle} value={titleTask}
                       onChange={(e) => setTitleTask(e.currentTarget.value)}/>
                {error && <span style={{'color': 'red'}}>Ввидите символ!</span>}
            </div>
            <button className={styles.buttonAddTitle} style={{'marginLeft': 50}} onClick={addTask}>add task</button>
        </div>
    )
}

export default TitleTask;