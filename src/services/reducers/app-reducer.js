import * as _ from "lodash";
import {
  SET_DATA,
  SET_MAIN_ERROR,
  SET_ORDER_NUMBER,
  DELETE_INGREDIENT_FROM_INGREDIENTS,
  REPLACE_INNER_DRAG_INGREDIENT,
  SET_ADDED_INGREDIENT
} from "../../services/actions/app-actions";

const initialState = {
  data: null,
  error: null,
  bun: null,
  ingredients: [],
  selectedIngredient: null,
  orderNumber: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA: {
      return {
        ...state,
        data: action.data,
      };
    }
    case SET_MAIN_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case SET_ADDED_INGREDIENT: {
      const newState =
        action.ingredient.type === "bun"
          ? { ...state, bun: action.ingredient }
          : {
            ...state,
            ingredients: [
              ...state.ingredients,
              {
                ...action.ingredient,
                key: _.uniqueId(action.ingredient._id),
              },
            ],
          };
      return { ...newState };
    }
    case SET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        bun: null,
        ingredients: [],
      };
    }
    case DELETE_INGREDIENT_FROM_INGREDIENTS: {
      return {
        ...state,
        ingredients: state.ingredients.filter((el) => el.key !== action.key)
      }
    }
    case REPLACE_INNER_DRAG_INGREDIENT: {
      const dragCard = [...state.ingredients][action.dragIndex];
      if (!dragCard){return}
        const newArray = [
          ...state.ingredients,
        ]
        newArray.splice(action.dragIndex, 1)
        newArray.splice(action.hoverIndex, 0, dragCard)
        return { 
          ...state, 
          ingredients: newArray
        };
    }
    default: {
      return state;
    }
  }
};
