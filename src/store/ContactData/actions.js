import * as actionTypes from "./types";
import axios from "../../axios-orders";

const postOrderRequest = () => {
  return {
    type: actionTypes.POST_ORDER_REQUEST
  };
};

const postOrderSuccess = (id, orderData) => {
  return {
    type: actionTypes.POST_ORDER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

const postOrderFailure = error => {
  return {
    type: actionTypes.POST_ORDER_FAILURE,
    error: error
  };
};

export const postOrder = orderData => {
  return dispatch => {
    dispatch(postOrderRequest());
    console.log("dis[atched");
    axios
      .post("/orders.json ", orderData)
      .then(r => {
        dispatch(postOrderSuccess(r.data.name, orderData));
      })
      .catch(e => {
        dispatch(postOrderFailure(e));
      });
  };
};

export const postInit = () => {
  return {
    type: actionTypes.POST_INIT
  };
};
