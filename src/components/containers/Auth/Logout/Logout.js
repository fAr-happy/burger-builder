import React, { Component } from "react";
import { connect } from "react-redux";
import { onLogout } from "store/Auth/actions";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default connect(null, { onLogout })(Logout);
