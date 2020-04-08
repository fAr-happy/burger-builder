import React, { Component } from "react";
import CheckoutSummary from "components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "components/containers/ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutCanceled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let ingredients = null;
    ingredients = this.props.ingredients ? (
      <CheckoutSummary
        ingredients={this.props.ingredients}
        checkoutCanceled={this.checkoutCanceled}
        checkoutContinued={this.checkoutContinued}
      ></CheckoutSummary>
    ) : (
      (ingredients = <Redirect to="/" />)
    );
    return (
      <div>
        {ingredients}
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
