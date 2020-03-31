import * as actionType from "./types";
import axios from "axios";

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingType]:
            state.ingredients[action.payload.ingType] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingType]
      };
    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingType]:
            state.ingredients[action.payload.ingType] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingType]
      };
    case actionType.getIngredientsSuccess:
      return {
        ...state,
        error: false,
        ingredients: {
          salad: action.payload.ingredients.salad,
          cheese: action.payload.ingredients.cheese,
          meat: action.payload.ingredients.meat,
          bacon: action.payload.ingredients.bacon
        }
      };
    case actionType.getIngredientsFailure:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
