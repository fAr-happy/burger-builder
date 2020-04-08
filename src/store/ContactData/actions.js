import * as actionTypes from "./types";
import axios from "../../axios-orders";

const postOrderRequest = () => {
  return {
    type: actionTypes.POST_ORDER_REQUEST
  };
};

const postOrderSuccess = () => {
  return {
    type: actionTypes.POST_ORDER_SUCCESS
  };
};

const postOrderFailure = error => {
  return {
    type: actionTypes.POST_ORDER_FAILURE,
    error: error
  };
};

export const postOrder = (orderData, token )=> {
  return dispatch => {
    dispatch(postOrderRequest());
    console.log("dis[atched");
    axios
      .post(`/orders.json?auth=${token}`, orderData)
      .then(r => {
        dispatch(postOrderSuccess());
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
