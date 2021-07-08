import {
  OPEN_MODAL_INGREDIENT_DETAILS,
  CLOSE_MODAL_INGREDIENT_DETAILS,
  OPEN_MODAL_ORDER_DETAILS,
  CLOSE_MODAL_ORDER_DETAILS,
  SET_CURRENT_BURGER_INGREDIENTS_NAME
} from "../actions/interface-actions";

const initialState = {
  isModalIngredientDetailsOpen: false,
  isModalOrderDetailsOpen: false,
  currentBurgerIngredientsName: "Булки",
};

export const interfaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_INGREDIENT_DETAILS: {
      return {
        ...state,
        isModalIngredientDetailsOpen: true,
      }
    }
    case CLOSE_MODAL_INGREDIENT_DETAILS: {
      return {
        ...state,
        isModalIngredientDetailsOpen: false,
      }
    }
    case OPEN_MODAL_ORDER_DETAILS: {
      return {
        ...state,
        isModalOrderDetailsOpen: true,
      }
    }
    case CLOSE_MODAL_ORDER_DETAILS: {
      return {
        ...state,
        isModalOrderDetailsOpen: false,
      }
    }
    case SET_CURRENT_BURGER_INGREDIENTS_NAME: {
      return {
        ...state,
        currentBurgerIngredientsName: action.ingredientsName
      }
    }
    default: {
      return state;
    }
  }
};
