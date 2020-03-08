import React from "react";
import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
  // let transformedIngredients = Object.keys(props.ingredients).map(tiKey => {
  //   return [...Array(props.ingredients[tiKey])].map((_, i) => {
  //     return <BurgerIngredient type={tiKey} key={tiKey + i} />;
  //   });
  // });

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {/* {transformedIngredients} */}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
