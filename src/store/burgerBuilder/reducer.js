import * as actionType from "./types";

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 2,
  meat: 4,
  bacon: 3
};

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    meat: 0,
    cheese: 0
  },
  totalPrice: 0
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
    default:
      return state;
  }
};

export default reducer;
