import React, {useState} from 'react';
import styles from './header.module.scss'
import {useDispatch} from "react-redux";
import {requestAddTask} from "../../redux/task-reducer";

const Header = () => {
    const [titleTask, setTitleTask] = useState('');
    const dispatch = useDispatch();
    const addTask = () => {
        dispatch(requestAddTask(titleTask));
        setTitleTask('');
        console.log(titleTask)
    }

    return (
        <div className={styles.wrapperHeader}>
            <input value={titleTask} onChange={(e) => setTitleTask(e.currentTarget.value)}/>
            <button style={{'marginLeft': 50}} disabled={titleTask.length < 1} onClick={addTask}>add task</button>
        </div>
    )
}

export default Header;