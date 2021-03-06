import React, {useCallback, useEffect} from 'react';
import styles from './body.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {ListItem} from "./listItem/ListItem";
import update from 'immutability-helper';
import {requestGetTask, setTasks} from "../../redux/task-reducer";
import TitleTask from "./titleTask/TitleTask";
import ErrorModal from "./errorModal/ErrorModal";

const Body = () => {
    const dispatch = useDispatch();
    const listToDoes = useSelector(state => state.taskPage.tasks);
    const errorMessage = useSelector(state => state.taskPage.messageError)

    useEffect(() => {
        dispatch(requestGetTask());
    }, [])


    const exchangeItems = useCallback((dragIndex, hoverIndex) => {
        const dragCard = listToDoes[dragIndex];
        dispatch(setTasks(update(listToDoes, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        })));
    }, [listToDoes]);

    const ListItems = listToDoes.map((item, index) => <ListItem key={item.id} {...item} index={index}
                                                                exchangeItems={exchangeItems}/>)

    return (
        <div className={styles.wrapperBody}>
            {errorMessage.length > 1 ? <ErrorModal errorMessage={errorMessage}/> :
                <>
                    <TitleTask/>
                    <div className={styles.wrapperTask}>{ListItems}</div>
                </>}
        </div>
    )
}

export default Body;