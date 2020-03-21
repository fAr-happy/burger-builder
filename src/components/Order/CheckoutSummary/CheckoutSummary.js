import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const CheckoutSummary = props => {
  return (
    <div>
      <h1>Wooow such a delicious Burger</h1>
      <div>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <Button btntype="Danger" onClick={props.checkoutCanceled}>
        CANCEL
      </Button>
      <Button btntype="Success" onClick={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
