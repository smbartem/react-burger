import * as _ from "lodash";
import {
  SET_DATA,
  SET_ERROR,
  SET_ORDER_NUMBER,
  SET_SELECT_INGREDIENT,
  DELETE_INGREDIENT_FROM_INGREDIENTS,
} from "../../services/actions/app-actions";
import { OPEN_MODAL_ORDER_DETAILS } from "../../services/actions/interface-actions"
const axios = require("axios");
const getDataUrl = "https://norma.nomoreparties.space/api/ingredients";
const postOrderUrl = "https://norma.nomoreparties.space/api/orders";

const initialState = {
  data: null,
  error: null,
  bun: null,
  ingredients: [],
  selectedIngredient: null,
  orderNumber: null,
};

export function getData() {
  return function(dispatch) {
    axios
    .get(getDataUrl)
    .then((data) => {
      dispatch({ type: SET_DATA, data: data.data.data });
    })
    .catch((error) => dispatch({ type: SET_ERROR, error: `${error}` }));
  }
};

export function getOrder(ingredients, bun) {
  return function(dispatch) {
    const ingredientsId = ingredients.map((el) => el._id);
    const orderInfo = [bun._id, ...ingredientsId, bun._id];
    axios
      .post(postOrderUrl, {
        ingredients: orderInfo,
      })
      .then((data) => {
        dispatch({
          type: SET_ORDER_NUMBER,
          orderNumber: data.data.order.number,
        });
      })
      .then(() => dispatch({ type: OPEN_MODAL_ORDER_DETAILS }))
      .catch((error) => dispatch({ type: SET_ERROR, error: `${error}` }));
  }
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA: {
      return {
        ...state,
        data: action.data,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case SET_SELECT_INGREDIENT: {
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
      return { ...newState, selectedIngredient: action.ingredient };
    }
    case SET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: action.orderNumber,
      };
    }
    case DELETE_INGREDIENT_FROM_INGREDIENTS: {
      return {
        ...state,
        ingredients: state.ingredients.filter((el) => el.key !== action.key)
      }
    }
    default: {
      return state;
    }
  }
};
