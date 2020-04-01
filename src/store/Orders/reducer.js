import * as actionTypes from "./types";
import {updateObject} from '../utilities/updateObject';

const initialState = {
  orders: null,
  loading: false,
  error: false
};

const ordersWithStructure = data => {
  let newOrders = [];
  for (let key in data) {
    newOrders.push({
      id: key,
      price: data[key].price,
      ingredients: data[key].ingredients
    });
  }
  return newOrders;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_REQUEST: return updateObject(state,{loading:true});
    case actionTypes.FETCH_ORDERS_SUCCESS: return updateObject(state,{orders: ordersWithStructure(action.data),loading: false});
    case actionTypes.FETCH_ORDERS_FAILURE: return updateObject(state,{error: action.error, loading:false});
    default: return state;
  }
};

export default reducer;

