import { OPEN_MODAL_ORDER_DETAILS } from "../actions/interface-actions"
const axios = require("axios");
const getDataUrl = "https://norma.nomoreparties.space/api/ingredients";
const postOrderUrl = "https://norma.nomoreparties.space/api/orders";

export const SET_DATA = 'SET_DATA';
export const SET_ERROR = 'SET_ERROR';
export const SET_ORDER_NUMBER = 'SET_ORDER_NUMBER';
export const SET_SELECT_INGREDIENT = 'SET_SELECT_INGREDIENT';
export const DELETE_INGREDIENT_FROM_INGREDIENTS = 'DELETE_INGREDIENT_FROM_INGREDIENTS';
export const REPLACE_INNER_DRAG_INGREDIENT = 'REPLACE_INNER_DRAG_INGREDIENT';

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