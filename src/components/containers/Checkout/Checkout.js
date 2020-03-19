import React from "react";
import CheckoutSummary from "../../Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactDate/ContactDate";

class Checkout extends React.Component {
  state = {
    ingredients: null
  };

  checkoutCanceled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const queryIngredients = {};
    for (let param of query.entries()) {
      queryIngredients[param[0]] = +param[1];
    }
    this.setState({
      ingredients: queryIngredients
    });
  }

  render() {
    let ingredients = null;
    if (this.state.ingredients) {
      ingredients = (
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceled}
          checkoutContinued={this.checkoutContinued}
        ></CheckoutSummary>
      );
    }
    return (
      <div>
        {ingredients}
        <Route path={this.props.match.path + '/contact-data'}  component={ContactData} />
      </div>
    );
  }
}

export default Checkout;
