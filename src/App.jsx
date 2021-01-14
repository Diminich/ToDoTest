import React from "react";
import styles from './app.module.scss';
import Body from "./components/body/Body";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const App = () => {
    return (
        <div className={styles.wrapperApp}>
            <DndProvider backend={HTML5Backend}>
                <Body/>
            </DndProvider>
        </div>
    );
}

export default App;