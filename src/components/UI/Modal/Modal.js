import React from "react";
import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary";

const Modal = props => (
  <Aux>
    <Backdrop hideHandler={props.hideModalHandler} show={props.show} />
    <div
      className={styles.Modal}
      style={{
        opacity: props.show ? "1" : "0",
        transform: props.show ? "translateY(0)" : "translateY(-100vh)"
      }}
    >
      {props.children}
    </div>
  </Aux>
);

export default Modal;
