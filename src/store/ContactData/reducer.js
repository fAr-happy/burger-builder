import * as actionTypes from "./types";

const initialState = {
  orders : [],
  loading: false,
  purchased: false
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_ORDER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.POST_ORDER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      }
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
        
      };
    case actionTypes.POST_ORDER_FAILURE:
      return {
        ...state,
        loading: false
      };
      case actionTypes.POST_INIT:
        return{
          ...state,
          purchased: false
        }
    default:
      return state;
  }
};

export default reducer;
