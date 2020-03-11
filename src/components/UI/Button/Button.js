import React from "react";
import styles from "./Button.module.css";

const Button = props => {
  return (
    <button
      className={[styles.Button, styles[props.btnType]].join(" ")}
      {...props}
    ></button>
  );
};

export default Button;
