import React, { Component, Fragment } from "react";
import styles from "./Modal.module.css";
import Backdrop from "components/UI/Backdrop/Backdrop";

//haji pashamam

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  render() {
    return (
      <Fragment>
        <Backdrop
          hideHandler={this.props.hideModalHandler}
          show={this.props.show}
        />
        <div
          className={styles.Modal}
          style={{
            opacity: this.props.show ? "1" : "0",
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)"
          }}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
