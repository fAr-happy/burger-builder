import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";

const Toolbar = () => {
  return (
    <header className={styles.Toolbar}>
      <div>MENU</div>
      <Logo />
      <nav>
        <NavigationItems/>
      </nav>
    </header>
  );
};

export default Toolbar;
