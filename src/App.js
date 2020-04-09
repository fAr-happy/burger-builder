import React, { Component } from "react";
import Layout from "components/Layout/Layout";
import BurgerBuilder from "components/containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter } from "react-router-dom";
import Checkout from "components/containers/ContactData/Checkout/Checkout";
import Orders from "components/containers/Orders/Orders";
import Auth from "components/containers/Auth/Auth";
import Logout from "components/containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { authCheckState } from "store/Auth/actions";

class App extends Component {
  componentDidMount() {
    this.props.authCheckState();
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(connect(null, { authCheckState })(App));
