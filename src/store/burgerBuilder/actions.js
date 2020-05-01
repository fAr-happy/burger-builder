import * as actionTypes from "./types";
import axios from "axios-orders";

export const addIngredient = payload => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: payload
  };
};

export const removeIngredient = payload => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: payload
  };
};

const ingredientsSuccess = payload => {
  return {
    type: actionTypes.getIngredientsSuccess,
    payload: { ingredients: payload }
  };
};

const ingredientsFailure = () => {
  return {
    type: actionTypes.getIngredientsFailure
  };
};

export const fetchIngredients = () => {
  return dispatch => {
    axios
      .get("https://burger-builder-3b1ef.firebaseio.com/ingredients.json")
      .then(response => {
        dispatch(ingredientsSuccess(response.data));
      })
      .catch(error => {
        dispatch(ingredientsFailure());
      });
  };
};
