import styles from "../body.module.scss";
import React, {useRef, useState} from "react";
import {useDrag, useDrop} from "react-dnd";
import {requestDeleteTask, requestGetTask, requestPutTask} from "../../../redux/task-reducer";
import {useDispatch} from "react-redux";

export const ListItem = ({id, title, index, exchangeItems}) => {
    const dispatch = useDispatch();
    const [newTitleTask, setNewTitleTask] = useState('');
    const [refactoredId, setRefactoredId] = useState(null);
    const [done, isDone] = useState(false)

    const deleteTask = (id) => {
        dispatch(requestDeleteTask(id));
    }

    const updateTitleTask = (id) => {
        dispatch(requestPutTask(id, newTitleTask))
        dispatch(requestGetTask());
        setRefactoredId(null)
    }

    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: 'listItem',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            exchangeItems(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [, drag] = useDrag({
        item: {type: 'listItem', id, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drag(drop(ref));
    return (
        <ul ref={drag(drop(ref))} className={done ? styles.taskDone : styles.task}>
            <div key={id} draggable={true} onClick={() => setRefactoredId(id)} style={{'display': 'flex', 'alignItems': 'center'}}>
                {id === refactoredId ?
                    <input value={newTitleTask} autoFocus={true} onBlur={() => updateTitleTask(id)}
                           onChange={(e) => setNewTitleTask(e.currentTarget.value)}/>
                    : title}
            </div>
            <div className={styles.inputCheckboxInputButton}>
                <input type='checkbox' checked={done} onChange={() => isDone(!done)}/>
                <button className={styles.deleteButton} onClick={() => deleteTask(id)}>X</button>
            </div>
        </ul>
    )
}