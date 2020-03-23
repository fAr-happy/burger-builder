import React from "react";
import Button from "../../../UI/Button/Button";
import styles from "./ContactData.module.css";
import Spinner from "../../../UI/Spinner/Spinner";
import axios from "../../../../axios-orders";
import Input from "../../../UI/Input/Input";
import withErrorHandler from "../../../../hoc/withErrorHandler/withErrorHandler";

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail"
        },
        value: ""
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
        value: ""
      }
    },
    loading: false
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

  inputChangeHandler = (event, identifier) => {
    const updatedForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedForm[identifier] };
    updatedFormElement.value = event.target.value;
    updatedForm[identifier] = updatedFormElement;
    this.setState({
      orderForm: updatedForm
    });
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
          ></Input>
        ))}

        <Button btntype="Success" onClick={this.orderHandler}>
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

export default withErrorHandler(ContactData, axios);
