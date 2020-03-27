import React, {Component} from "react";
import axios from "../../../axios-orders";
import Order from "../../Order/Order";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import styles from "./Orders.module.css";

class Orders extends Component {
  state = {
    orders: null,
    hasError: false
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(r => {
        const fetchOrders = [];
        for (let key in r.data) {
          fetchOrders.push({
            ...r.data[key],
            id: key
          });
        }
        this.setState({ orders: fetchOrders });
      })
      .catch(e => this.setState({ hasError: true }));
  }

  render() {
    const { orders, hasError } = this.state;
    let ordersContent = <Spinner />;
    if (hasError) {
      ordersContent = <p>Sorry Error Happend</p>;
    }
    if (orders) {
      ordersContent = orders.map(({ id, price, ingredients }) => (
        <Order key={id} price={price} ingredients={ingredients} />
      ));
    }
    return <div className={styles.Orders}>{ordersContent}</div>;
  }
}

export default withErrorHandler(Orders, axios);
