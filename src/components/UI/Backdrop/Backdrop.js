import React from "react";
import styles from "./Backdrop.module.css";

const Backdrop = props => {
  return (
    props.show && (
      <div className={styles.Backdrop} onClick={props.hideHandler}></div>
    )
  );
};

export default Backdrop;
