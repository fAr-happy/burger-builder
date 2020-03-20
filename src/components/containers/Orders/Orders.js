import React from "react";
import axios from "../../../axios-orders";
import Order from "../../Order/Order";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import styles from "./Orders.module.css";

class Orders extends React.Component {
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
    let orders = <Spinner />;
    if (this.state.hasError) {
      orders = <p>Sorry Error Happend</p>;
    }
    if (this.state.orders) {
      orders = this.state.orders.map(order => {
        return (
          <Order
            key={order.id}
            price={order.price}
            ingredinets={order.ingredients}
            bacon={order.ingredients.bacon}
            meat={order.ingredients.meat}
            cheese={order.ingredients.cheese}
            salad={order.ingredients.salad}
          />
        );
      });
    }
    return <div className={styles.Orders}>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
