import { SET_CURRENT_BURGER_INGREDIENTS_NAME } from "../actions/interface-actions";

const initialState = {
  currentBurgerIngredientsName: "Булки",
};

export const interfaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_BURGER_INGREDIENTS_NAME: {
      return {
        ...state,
        currentBurgerIngredientsName: action.ingredientsName,
      };
    }
    default: {
      return state;
    }
  }
};
