import React from "react";
import burgerLogo from "assets/burger-logo.png";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.Logo}>
      <img  src={burgerLogo} alt="MyBurger"></img>
    </div>
  );
};

export default Logo;
