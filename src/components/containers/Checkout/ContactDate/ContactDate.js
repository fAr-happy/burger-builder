import React from "react";
import Button from "../../../UI/Button/Button";
import styles from "./ContactData.module.css";
import Spinner from "../../../UI/Spinner/Spinner";
import axios from "../../../../axios-orders";

class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    console.log(this.props.price);
    console.log(this.props.ingredients);
    event.preventDefault();
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Farshad Hassanpour",
        address: {
          street: "azadi",
          zipCode: "446666",
          country: "Iran"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(r => {
        this.setState({ loading: false });
        this.props.history.push('/')
      })
      .catch(e => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form>
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        ></input>
        <input
          className={styles.Input}
          type="email"
          name="email"
          placeholder="Your E mail"
        ></input>
        <input
          className={styles.Input}
          type="text"
          name="street"
          placeholder="Street"
        ></input>
        <input
          className={styles.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        ></input>
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

export default ContactData;
