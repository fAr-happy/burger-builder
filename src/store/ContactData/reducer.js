import * as actionTypes from "./types";
import {updateObject} from '../utilities/updateObject';

const initialState = {
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_ORDER_REQUEST: return updateObject(state,{loading:true});
    case actionTypes.POST_ORDER_SUCCESS: return updateObject(state,{loading: false, purchased: true});
    case actionTypes.POST_ORDER_FAILURE: return updateObject(state,{loading:false});
    case actionTypes.POST_INIT: return updateObject(state,{purchased: false});
    default: return state;
  }
};

export default reducer;

