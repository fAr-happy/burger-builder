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
      salad: 1,
      bacon: 1,
      cheese: 1,
      meat: 1
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
    console.log(this.state.totalPrice)
  };

  removeIngredientHandler = type => {
    console.log("minus");
    console.log(type);
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addingIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
