import React, { Component } from "react";
import Input from "components/UI/Input/Input";
import Button from "components/UI/Button/Button";
import Spinner from "components/UI/Spinner/Spinner";
import { auth } from "./Auth.module.css";
import { connect } from "react-redux";
import { onAuth } from "store/Auth/actions";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    authForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
          eM: "Invalid Email!",
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLenght: 6,
          maxLength: 50,
          eM: "Short Password",
        },
        valid: false,
        touched: false,
      },
    },
    formValid: false,
    isSignup: true,
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.replace(/\s+/g, "") !== "" && isValid;
    }
    if (rules.minLenght) {
      isValid = value.replace(/\s+/g, "").length >= rules.minLenght && isValid;
    }
    if (rules.maxLength) {
      isValid = value.replace(/\s+/g, "").length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(String(value).toLowerCase()) && isValid;
    }
    return isValid;
  };

  inputChangeHandler = (event, identifier) => {
    const updatedForm = { ...this.state.authForm };
    const updatedFormElement = { ...updatedForm[identifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[identifier] = updatedFormElement;

    let formValid = true;
    for (let identifier in updatedForm) {
      formValid = updatedForm[identifier].valid && formValid;
    }

    this.setState({ authForm: updatedForm, formValid: formValid });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignup
    );
  };

  swithAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  render() {
    let errorMessage = this.props.error ? (
      <p>{this.props.error.data.error.message}</p>
    ) : null;

    const formElementsArray = [];
    for (let key in this.state.authForm) {
      formElementsArray.push({
        id: key,
        config: this.state.authForm[key],
      });
    }

    let form = formElementsArray.map((e) => (
      <Input
        changed={(event) => this.inputChangeHandler(event, e.id)}
        key={e.id}
        elementType={e.config.elementType}
        elementConfig={e.config.elementConfig}
        value={e.config.value}
        invalid={!e.config.valid}
        shouldValidation={e.config.validation}
        touched={e.config.touched}
        errorMessage={e.config.validation}
      ></Input>
    ));

    if (this.props.loading) {
      form = <Spinner></Spinner>;
    }

    let authRedirect = null;
    if (this.props.token) {
      authRedirect = <Redirect to="/checkout" />;
    }

    return (
      <div className={auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {this.state.isSignup ? "Sign Up Form" : "Sign IN Form"}
          {form}
          <Button
            btntype="Success"
            // disabled={!this.state.formValid}
          >
            SUBMIT
          </Button>
        </form>
        <Button btntype="Danger" onClick={this.swithAuthModeHandler}>
          {this.state.isSignup
            ? "go to <<SIGN IN>> form "
            : "go to <<SIGN UP>> form "}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: !!state.auth.token,
    userId: state.auth.userId,
    error: state.auth.error,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { onAuth })(Auth);
