import React, {useEffect} from "react";
import styles from './app.module.scss';
import Body from "./components/body/Body";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useDispatch, useSelector} from "react-redux";
import {requestLogin} from "./redux/task-reducer";

const App = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.taskPage.isLogin)
    useEffect(() => {
        dispatch(requestLogin())
    }, [])
    return (
        <div className={styles.wrapperApp}>
            {isLogin &&
            <DndProvider backend={HTML5Backend}>
                <Body/>
            </DndProvider>}
        </div>
    );
}

export default App;