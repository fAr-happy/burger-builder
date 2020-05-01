import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "components/Logo/Logo";
import NavigationItems from "components/Navigation/NavigationItems/NavigationItems";
import DrawerToggle from "components/Navigation/SidaDrawer/DrawerToggle/DrawerToggle";



const Toolbar = props => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle onClick={props.sideDrawerHandler} />
      <Logo />
      <nav className={styles.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} />  
      </nav>
    </header>
  );
};

export default Toolbar;


