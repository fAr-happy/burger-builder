import React from "react";
import Aux from "../Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <Aux>
          <Modal show>ERROR HAPPEND!</Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
