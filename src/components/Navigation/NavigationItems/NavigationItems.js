import React, { Fragment } from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "components/Navigation/NavigationItems/NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  const authenticatedNavigationItem = !props.isAuthenticated ? (
    <NavigationItem link="/auth">Login</NavigationItem>
  ) : (
    <Fragment>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/logout">Logout</NavigationItem>
    </Fragment>
  );
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>

      {authenticatedNavigationItem}
    </ul>
  );
};

export default NavigationItems;
