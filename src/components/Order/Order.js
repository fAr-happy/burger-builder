import React from "react";
import styles from "./Order.module.css";

const Order = ({ price, ingredients }) => {
  let orderIngredients = [];
  for (let i in ingredients) {
    orderIngredients.push([i, ingredients[i]]);
  }
  orderIngredients = orderIngredients.map(ing => (
    <span key={ing[0]}>{`${ing[0]} (${ing[1]})`}</span>
  ));

  return (
    <div className={styles.Order}>
      <p className={styles.Ingredients}>
        <span>Ingredints: </span>
        {orderIngredients}
      </p>
      <p className={styles.Price}>
        <span>price:</span>
        <strong>{Number.parseFloat(price).toFixed(2)} $</strong>
      </p>
    </div>
  );
};

export default Order;
