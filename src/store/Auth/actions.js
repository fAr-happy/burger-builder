import * as actionTypes from "./types";
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  };
};

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

const authLogout = time => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, +time * 1000);
  };
};

export const onAuth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUavc49Gdo3YXTJ3VNQB75mmFkrHfqk6s";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUavc49Gdo3YXTJ3VNQB75mmFkrHfqk6s";
    }
    axios
      .post(url, authData)
      .then(r => {
        console.log(r);
        dispatch(authSuccess(r.data.idToken, r.data.localId));
        dispatch(authLogout(r.data.expiresIn));
      })
      .catch(e => {
        console.log(e);
        dispatch(authFail(e.response));
      });
  };
};
