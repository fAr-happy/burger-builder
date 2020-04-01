import * as actionType from "./types";
import { updateObject } from "../utilities/updateObject";

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 2,
  meat: 4,
  bacon: 3
};

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false
};

const getTotalPriceFromQuantity = ingredients => {
  const ingredientsWithPrice = {};
  for (let key in ingredients) {
    ingredientsWithPrice[key] = ingredients[key] * INGREDIENT_PRICES[key];
  }
  const totalPrice = Object.values(ingredientsWithPrice).reduce(
    (a, b) => a + b
  );
  return totalPrice;
};

const ingredinetsOrder = payload => {
  return {
    salad: payload.ingredients.salad,
    cheese: payload.ingredients.cheese,
    meat: payload.ingredients.meat,
    bacon: payload.ingredients.bacon
  };
};

const ingredientSuccess = (state, payload) => {
  return {
    ...state,
    error: false,
    ingredients: ingredinetsOrder(payload),
    totalPrice: getTotalPriceFromQuantity(payload.ingredients)
  };
};

const addIngredinet = (state, payload) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [payload.ingType]: state.ingredients[payload.ingType] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[payload.ingType]
  };
};

const removeIngredint = (state, payload) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [payload.ingType]: state.ingredients[payload.ingType] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[payload.ingType]
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT: return addIngredinet(state, action.payload);
    case actionType.REMOVE_INGREDIENT: return removeIngredint(state, action.payload);
    case actionType.getIngredientsSuccess: return ingredientSuccess(state, action.payload);
    case actionType.getIngredientsFailure:  return updateObject(state, { error: true });
    default: return state;
  }
};

export default reducer;
