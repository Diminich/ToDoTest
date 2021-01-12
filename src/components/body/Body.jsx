import React, {useEffect, useState} from 'react';
import styles from './body.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {requestDeleteTask, requestGetTask, requestPutTask} from "../../redux/task-reducer";

const Body = () => {
    const [newTitleTask, setNewTitleTask] = useState('');
    const [refactoredId, setRefactoredId] = useState(null);
    const getTasks = useSelector(state => state.taskPage.tasks);
    const dispatch = useDispatch();
    const deleteTask = (id) => {
        dispatch(requestDeleteTask(id));
    }

    const updateTitleTask = (id) => {
        dispatch(requestPutTask(id, newTitleTask))
        setRefactoredId(null)
    }

    useEffect(() => {
        dispatch(requestGetTask());
    }, [refactoredId])

    return (
        <div className={styles.wrapperBody}>
            {getTasks.map(({id, title}) => (
                <div className={styles.wrapperTask}>
                    <div key={id} onClick={() => setRefactoredId(id)}>
                        {id === refactoredId ?
                            <input value={newTitleTask} autoFocus={true} onBlur={() => updateTitleTask(id)}
                                   onChange={(e) => setNewTitleTask(e.currentTarget.value)}/>
                            : title}
                    </div>
                    <input type='checkbox' />
                    <button onClick={() => deleteTask(id)}>X</button>
                </div>
            ))}
        </div>
    )
}

export default Body;