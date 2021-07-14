import {
  SET_REDIRECT_TO_LOGIN_FOR_ORDER,
  UNSET_REDIRECT_TO_LOGIN_FOR_ORDER,
  refreshAccessToken,
  SET_REDIRECT_TO_ORDER_DETAILS,
  UNSET_REDIRECT_TO_ORDER_DETAILS,
} from "./authorization-actions";
import { getCookie } from "../utils";

const axios = require("axios");
const getDataUrl = "https://norma.nomoreparties.space/api/ingredients";
const postOrderUrl = "https://norma.nomoreparties.space/api/orders";

export const SET_DATA = "SET_DATA";
export const SET_MAIN_ERROR = "SET_MAIN_ERROR";
export const SET_ORDER_NUMBER = "SET_ORDER_NUMBER";
export const DELETE_INGREDIENT_FROM_INGREDIENTS =
  "DELETE_INGREDIENT_FROM_INGREDIENTS";
export const REPLACE_INNER_DRAG_INGREDIENT = "REPLACE_INNER_DRAG_INGREDIENT";
export const SET_ADDED_INGREDIENT = "SET_ADDED_INGREDIENT";

export function getData() {
  return function (dispatch) {
    return axios
      .get(getDataUrl)
      .then((data) => {
        dispatch({ type: SET_DATA, data: data.data.data });
      })
      .catch((error) => dispatch({ type: SET_MAIN_ERROR, error: `${error}` }));
  };
}

export function getOrder(ingredients, bun) {
  return async function (dispatch) {
    if (!getCookie("refreshToken")) {
      await dispatch({ type: SET_REDIRECT_TO_LOGIN_FOR_ORDER });
      await dispatch({ type: UNSET_REDIRECT_TO_LOGIN_FOR_ORDER });
    } else {
      if (!getCookie("accessToken")) {
        await refreshAccessToken(dispatch);
      }
      const ingredientsId = ingredients.map((el) => el._id);
      const orderInfo = [bun._id, ...ingredientsId, bun._id];
      axios
        .post(
          postOrderUrl,
          {
            ingredients: orderInfo,
          },
          {
            headers: {
              authorization: `Bearer ${getCookie("accessToken")}`,
            },
          }
        )
        .then((data) => {
          dispatch({
            type: SET_ORDER_NUMBER,
            orderNumber: data.data.order.number,
          });
        })
        .then(() => {
          console.log('red')
          dispatch({ type: SET_REDIRECT_TO_ORDER_DETAILS });
          dispatch({ type: UNSET_REDIRECT_TO_ORDER_DETAILS });
        })
        .catch((error) =>
          dispatch({ type: SET_MAIN_ERROR, error: `${error}` })
        );
    }
  };
}
