import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";

const CheckoutSummary = props => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>Wooow such a delicious Burger</h1>
      <div>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <div className={styles.Buttons}>
        <Button btntype="Danger" onClick={props.checkoutCanceled}>
          CANCEL
        </Button>
        <Button btntype="Success" onClick={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
