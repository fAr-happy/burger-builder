import React from "react";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SidaDrawer/SideDrawer";

class Layout extends React.Component {
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
      <React.Fragment>
        <Toolbar sideDrawerHandler={this.sideDrawerHandler} />
        <SideDrawer
          hideSideDrawer={this.hideSideDrawer}
          show={this.state.showDrawer}
        />
        <hr />
        <main className={styles.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
