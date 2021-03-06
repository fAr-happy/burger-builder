import React, {Fragment} from "react";
import Button from "components/UI/Button/Button";

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
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious Burger with the following ingredients:</p>
      <ul>{orderSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button onClick={props.cancel} btntype="Danger">
        CANCEL
      </Button>
      <Button onClick={props.continue} btntype="Success">
        CONTINUE
      </Button>
    </Fragment>
  );
};

export default OrderSummary;
