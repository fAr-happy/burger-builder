import * as actionTypes from "./types";
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const onLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const authLogout = (time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(onLogout());
    }, +time * 1000);
  };
};

export const onAuth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUavc49Gdo3YXTJ3VNQB75mmFkrHfqk6s";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUavc49Gdo3YXTJ3VNQB75mmFkrHfqk6s";
    }
    axios
      .post(url, authData)
      .then((r) => {
        console.log(r);
        const expirationDate = new Date(
          new Date().getTime() + r.data.expiresIn * 1000
        );

        localStorage.setItem("token", r.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", r.data.localId);

        dispatch(authSuccess(r.data.idToken, r.data.localId));
        dispatch(authLogout(r.data.expiresIn));
      })
      .catch((e) => {
        console.log(e);
        dispatch(authFail(e.response));
      });
  };
};

//action for localStorage
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(onLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(onLogout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          authLogout(expirationDate.getTime() - new Date().getTime() / 1000)
        );
      }
    }
  };
};
