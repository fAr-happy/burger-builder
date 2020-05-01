import * as actionTypes from "store/Orders/types";
import axios from "axios-orders";

const fetchOrdersRequest = () => {
  return {
    type: actionTypes.FETCH_ORDERS_REQUEST
  };
};

const fetchOrdersSuccess = data => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    data: data
  };
};

const fetchOrdersFailure = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILURE,
    error: error
  };
};

export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrdersRequest());
    axios
      .get(`/orders.json?auth=${token}`)
      .then(r => {
        dispatch(fetchOrdersSuccess(r.data));
      })
      .catch(e => {
        dispatch(fetchOrdersFailure(e));
      });
  };
};


