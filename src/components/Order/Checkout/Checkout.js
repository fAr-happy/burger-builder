import React, {Component} from "react";
import CheckoutSummary from "../CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../../containers/ContactData/ContactData";
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
    if (this.props.ingredients) {
      ingredients = (
        <CheckoutSummary
          ingredients={this.props.ingredients}
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
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
