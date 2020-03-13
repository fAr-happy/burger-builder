import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import DrawerToggle from "../SidaDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle onClick={props.sideDrawerHandler}/> 
      <Logo />
      <nav className={styles.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
