import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Burger from "../../Burger/Burger";
import BuildControls from "../../Burger/BuildControls/BuildControls";

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
    totalPrice: 4
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
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };
    for (let i in disabledInfo) {
      disabledInfo[i] = disabledInfo[i] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addingIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
