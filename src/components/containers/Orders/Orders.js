import React, { Component } from "react";
import axios from "axios-orders";
import Order from "components/Order/Order";
import Spinner from "components/UI/Spinner/Spinner";
import withErrorHandler from "hoc/withErrorHandler/withErrorHandler";
import styles from "./Orders.module.css";
import { connect } from "react-redux";
import { fetchOrders } from "store/Orders/actions";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }

  render() {
    const { orders, error, loading } = this.props;
    let ordersContent = loading ? <Spinner /> : null;
    if (error) {
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

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    error: state.orders.error,
    token: state.auth.token
  };
};

export default connect(mapStateToProps, { fetchOrders })(
  withErrorHandler(Orders, axios)
);
