import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Burger from "../../Burger/Burger";

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 3,
      bacon: 2,
      cheese: 5,
      meat: 9
    }
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
      </Aux>
    );
  }
}

export default BurgerBuilder;
