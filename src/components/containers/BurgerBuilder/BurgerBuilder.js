import React, { Component, Fragment } from "react";
import Burger from "../../Burger/Burger";
import BuildControls from "../../Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary";
import axios from "../../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  fetchIngredients
} from "../../../store/BurgerBuilder/actions";
import {
  postInit
} from '../../../store/ContactData/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.fetchIngredients();
  }

  updatePurchasedState = () => {
    let sum = Object.values(this.props.ingredients).reduce((a, b) => a + b) > 0;
    return sum;
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    this.props.postInit();
    this.props.history.push({
      pathname: "/checkout"
    });
  };

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let i in disabledInfo) {
      disabledInfo[i] = disabledInfo[i] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        cancel={this.purchaseCancelHandler}
        continue={this.purchaseContinueHandler}
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
      />
    );

    let burger = this.props.error ? (
      <p style={{ textAlign: "center", marginTop: "200px" }}>sss</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Modal
            show={this.state.purchasing}
            hideModalHandler={this.purchaseCancelHandler}
          >
            {orderSummary}
          </Modal>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={ingType =>
              this.props.addIngredient({ ingType: ingType })
            }
            removeIngredient={ingType =>
              this.props.removeIngredient({ ingType: ingType })
            }
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchasedState()}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );
    }

    return <Fragment>{burger}</Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

export default connect(mapStateToProps, {
  addIngredient,
  removeIngredient,
  fetchIngredients,
  postInit
})(withErrorHandler(BurgerBuilder, axios));
