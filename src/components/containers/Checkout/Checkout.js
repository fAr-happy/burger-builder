import React from "react";
import CheckoutSummary from "../../Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactDate/ContactDate";

class Checkout extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 0
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
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        queryIngredients[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients: queryIngredients,
      totalPrice: price
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
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
