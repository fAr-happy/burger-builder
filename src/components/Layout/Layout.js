import React from "react";
import Aux from "../../hoc/Auxiliary";
import styles from './Layout.module.css';

const Layout = props => {
  return (
    <Aux>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <hr/>
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;  
