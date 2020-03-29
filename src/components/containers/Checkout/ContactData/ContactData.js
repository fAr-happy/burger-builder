import React, {Component} from "react";
import Button from "../../../UI/Button/Button";
import styles from "./ContactData.module.css";
import Spinner from "../../../UI/Spinner/Spinner";
import axios from "../../../../axios-orders";
import Input from "../../../UI/Input/Input";
import withErrorHandler from "../../../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true,
          minLenght: 3,
          maxLength: 6,
          eM: "Your Name Characters Must Be Between 3 and 6"
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true,
          minLenght: 3,
          maxLength: 6,
          eM: "Your StreetName Characters Must Be Between 3 and 6"
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLenght: 5,
          maxLength: 5,
          eM: "ZipCode is Wrong!"
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true,
          minLenght: 3,
          maxLength: 6,
          eM: "inCorrect!"
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
          eM: "Invalid Email!"
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest"
            },
            {
              value: "cheapest",
              displayValue: "Cheapest"
            }
          ]
        },
        validation: {},
        value: "fastest",
        valid: true
      }
    },
    loading: false,
    formValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    const formInfo = { ...this.state.orderForm };
    const customerForm = {};
    for (let key in formInfo) {
      customerForm[key] = formInfo[key].value;
    }
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customerDetailes: customerForm
    };
    axios
      .post("/orders.json", order)
      .then(r => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(e => this.setState({ loading: false }));
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
    if (rules.isNumeric) {
      const pattern = /^(\+98|0)?9\d{9}$/g;
      isValid = pattern.test(value);
    }

    return isValid;
  };

  inputChangeHandler = (event, identifier) => {
    const updatedForm = { ...this.state.orderForm };
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

    this.setState({ orderForm: updatedForm, formValid: formValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form>
        {formElementsArray.map(e => (
          <Input
            changed={event => this.inputChangeHandler(event, e.id)}
            key={e.id}
            elementType={e.config.elementType}
            elementConfig={e.config.elementConfig}
            value={e.config.value}
            invalid={!e.config.valid}
            shouldValidation={e.config.validation}
            touched={e.config.touched}
            errorMessage={e.config.validation}
          ></Input>
        ))}

        <Button
          btntype="Success"
          onClick={this.orderHandler}
          disabled={!this.state.formValid}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  };
};

export default connect(mapStateToProps)(withErrorHandler(ContactData, axios));
