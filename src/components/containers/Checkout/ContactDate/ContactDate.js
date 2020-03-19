import React from "react";
import Button from "../../../UI/Button/Button";
import styles from "./ContactData.module.css";

class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    }
  };

  render() {
    return (
      <div className={styles.ContactData}>
        <h4>Enter Your Contact Data</h4>
        <form>
          <input className={styles.Input} type="text" name="name" placeholder="Your Name"></input>
          <input className={styles.Input} type="email" name="email" placeholder="Your E mail"></input>
          <input className={styles.Input} type="text" name="street" placeholder="Street"></input>
          <input className={styles.Input} type="text" name="postal" placeholder="Postal Code"></input>
          <Button btntype="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
