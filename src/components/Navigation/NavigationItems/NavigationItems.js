import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";

const NavigationItems = props => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/" active>
        Burger Builder
      </NavigationItem>
      <NavigationItem linke="/">Checkout</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
