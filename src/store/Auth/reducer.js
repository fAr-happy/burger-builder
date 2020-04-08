import * as actionTypes from "./types";
import { updateObject } from "../utilities/updateObject";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: action.idToken,
    userId: action.userId,
    error: null
  });
};

const authStart = state => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = state => {
  return updateObject(state, {
    token: null,
    userId: null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    default:
      return state;
  }
};

export default reducer;
