import React from "react";
import Aux from "../../hoc/Auxiliary";
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from "../Navigation/SidaDrawer/SideDrawer";

const Layout = props => {
  return (
    <Aux>
      <Toolbar />
      <SideDrawer />
      <hr/>
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;  
