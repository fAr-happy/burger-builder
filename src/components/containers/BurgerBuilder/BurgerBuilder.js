import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Burger from "../../Burger/Burger";
import BuildControls from "../../Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary";
import axios from "../../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  updatePurchasedState = ingredients => {
    let purchasable = Object.values(ingredients).reduce((a, b) => a + b) > 0;
    this.setState({
      purchasable: purchasable
    });
  };

  addingIngredientHandler = type => {
    const ingredientQuantity = this.state.ingredients[type];
    const updatedIngredientQuantity = ingredientQuantity + 1;
    let updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedIngredientQuantity;

    const price = this.state.totalPrice;
    const newPrice = price + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchasedState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const ingredientQuantity = this.state.ingredients[type];
    const updatedIngredientQuantity = ingredientQuantity - 1;
    let updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedIngredientQuantity;

    const price = this.state.totalPrice;
    const newPrice = price - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchasedState(updatedIngredients);
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
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Farshad Hassanpour",
        address: {
          street: "azadi",
          zipCode: "446666",
          country: "Iran"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(r => this.setState({ loading: false, purchasing: false }))
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let i in disabledInfo) {
      disabledInfo[i] = disabledInfo[i] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        cancel={this.purchaseCancelHandler}
        continue={this.purchaseContinueHandler}
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        {console.log(this.state.errorMassaege, this.state.error)}
        <Modal
          show={this.state.purchasing}
          hideModalHandler={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addingIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
