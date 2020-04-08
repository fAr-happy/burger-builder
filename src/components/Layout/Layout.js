import React, { Component, Fragment } from "react";
import styles from "./Layout.module.css";
import Toolbar from "components/Navigation/Toolbar/Toolbar";
import SideDrawer from "components/Navigation/SidaDrawer/SideDrawer";
import { connect } from "react-redux";

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
        <Toolbar 
        sideDrawerHandler={this.sideDrawerHandler}
        isAuth={this.props.isAuthenticated}
        />
        <SideDrawer
          hideSideDrawer={this.hideSideDrawer}
          show={this.state.showDrawer}
          isAuth={this.props.isAuthenticated}
        />
        <hr />
        <main className={styles.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout);   

