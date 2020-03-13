import React from "react";
import styles from "./Button.module.css";

const Button = props => {
  return (
    <button
      className={[styles.Button, styles[props.btntype]].join(" ")}
      {...props}
    ></button>
  );
};

export default Button;
