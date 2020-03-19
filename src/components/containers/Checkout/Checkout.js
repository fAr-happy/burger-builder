import React from "react";
import CheckoutSummary from "../../Order/CheckoutSummary/CheckoutSummary";

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
    return <div>{ingredients}</div>;
  }
}

export default Checkout;
