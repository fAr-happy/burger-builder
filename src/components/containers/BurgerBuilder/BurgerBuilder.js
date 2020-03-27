import React from "react";
import Burger from "../../Burger/Burger";
import BuildControls from "../../Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary";
import axios from "../../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionType from "../../../store/actions";

class BurgerBuilder extends React.Component {
  state = {
    // ingredients: null,
    // totalPrice: 4,
    // purchasable: false,
    hasIngredientsFailed: false,
    purchasing: false,
    loading: false
  };

  //redux-async
  componentDidMount() {
    // axios
    //   .get("/ingredients.json")
    //   .then(r => {
    //     this.setState({
    //       ingredients: r.data
    //     });
    //   })
    //   .catch(e => {
    //     this.setState({
    //       hasIngredientsFailed: true
    //     });
    //   });
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
    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.props.ingredients[i])
      );
    }
    queryParams.push("price=" + this.props.totalPrice);

    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let i in disabledInfo) {
      disabledInfo[i] = disabledInfo[i] <= 0;
    }
    let mainContent = <Spinner />;
    let orderSummary = (
      <OrderSummary
        cancel={this.purchaseCancelHandler}
        continue={this.purchaseContinueHandler}
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    if (this.state.hasIngredientsFailed) {
      mainContent = (
        <p style={{ textAlign: "center", marginTop: "200px" }}>
          Can't Get Ingredients, Please Reload the Page or
        </p>
      );
    }
    if (this.props.ingredients) {
      mainContent = (
        <React.Fragment>
          <Modal
            show={this.state.purchasing}
            hideModalHandler={this.purchaseCancelHandler}
          >
            {orderSummary}
          </Modal>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchasedState()}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );
    }

    return <React.Fragment>{mainContent}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingType =>
      dispatch({
        type: actionType.ADD_INGREDIENT,
        payload: { ingType: ingType }
      }),
    removeIngredient: ingType =>
      dispatch({
        type: actionType.REMOVE_INGREDIENT,
        payload: { ingType: ingType }
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
