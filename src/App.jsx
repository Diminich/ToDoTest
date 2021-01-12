import React from "react";
import styles from './app.module.scss';
import Header from "./components/header/Header";
import Body from "./components/body/Body";

const App = () => {
  return (
    <div className={styles.wrapperApp}>
      <Header />
      <Body />
    </div>
  );
}

export default App;
