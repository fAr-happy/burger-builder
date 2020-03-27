import React, {Component} from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./components/containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch } from "react-router-dom";
import Checkout from "./components/containers/Checkout/Checkout";
import Orders from "./components/containers/Orders/Orders";

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}
