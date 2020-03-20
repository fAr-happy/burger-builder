import React from "react";
import styles from "./Order.module.css";

const Order = props => {
  return (
    <div className={styles.Order}>
      <p className={styles.Ingredients}>
        <span>Ingredints: </span>
        <span>salad ({props.salad})</span>
        <span>meat ({props.meat})</span>
        <span>cheese ({props.cheese})</span>
        <span>bacon ({props.bacon})</span>
      </p>
      <p className={styles.Price}>
        <span>price:</span>
        <strong>{Number.parseFloat(props.price).toFixed(2)} $</strong>
      </p>
    </div>
  );
};

export default Order;
