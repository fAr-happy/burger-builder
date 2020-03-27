import React, { Component, Fragment } from "react";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SidaDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showDrawer: false
  };

  sideDrawerHandler = () => {
    this.setState({
      showDrawer: true
    });
  };

  hideSideDrawer = () => {
    this.setState({
      showDrawer: false
    });
  };

  render() {
    return (
      <Fragment>
        <Toolbar sideDrawerHandler={this.sideDrawerHandler} />
        <SideDrawer
          hideSideDrawer={this.hideSideDrawer}
          show={this.state.showDrawer}
        />
        <hr />
        <main className={styles.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
