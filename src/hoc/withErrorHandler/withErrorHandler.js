import React from "react";
import Aux from "../Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null
    };

    hideModalHandler = () => {
      this.setState({ error: null });
    };

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            hideModalHandler={this.hideModalHandler}
          >
            {`${this.state.error}`}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
