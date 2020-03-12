import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";

const Toolbar = () => {
  return (
    <header className={styles.Toolbar}>
      <div>MENU</div>
        <Logo />
      <ul>...</ul>
    </header>
  );
};

export default Toolbar;
