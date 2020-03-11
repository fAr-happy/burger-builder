import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  let orderSummary = Object.keys(props.ingredients).map(ingredient => {
    return (
      <li key={ingredient}>
        <span style={{ textTransform: "capitalize" }}>{ingredient}</span>:
        {props.ingredients[ingredient]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious Burger with the following ingredients:</p>
      <ul>{orderSummary}</ul>
      <p>Continue to Checkout?</p>
      <Button onClick={props.cancel} onClicke btnType="Danger">CANCEL</Button>
      <Button onClick={props.continue} btnType="Success">CONTINUE</Button>
    </Aux>
  );
};

export default OrderSummary;
