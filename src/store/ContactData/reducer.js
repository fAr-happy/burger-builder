import * as actionTypes from "./types";

const initialState = {
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
      return {
        ...state,
        loading: false,
        purchased: true
      };
    case actionTypes.POST_ORDER_FAILURE:
      return {
        ...state,
        loading: false
      };
    case actionTypes.POST_INIT:
      return {
        ...state,
        purchased: false
      };
    default:
      return state;
  }
};

export default reducer;
