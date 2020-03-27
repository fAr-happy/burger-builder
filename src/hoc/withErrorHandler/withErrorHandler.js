import React, { Component, Fragment } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null
      };
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.responseInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    hideModalHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            hideModalHandler={this.hideModalHandler}
          >
            {`${this.state.error}`}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
