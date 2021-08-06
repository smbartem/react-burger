import {
  SET_REDIRECT_TO_LOGIN_FOR_ORDER,
  UNSET_REDIRECT_TO_LOGIN_FOR_ORDER,
  refreshAccessToken,
  SET_REDIRECT_TO_ORDER_DETAILS,
  UNSET_REDIRECT_TO_ORDER_DETAILS,
} from "./authorization-actions";
import { getCookie } from "../utils";
import { TData, AppThunk, AppDispatch } from "../types";

const axios = require("axios");
const getDataUrl: string = "https://norma.nomoreparties.space/api/ingredients";
const postOrderUrl: string = "https://norma.nomoreparties.space/api/orders";

export const SET_DATA: "SET_DATA" = "SET_DATA";
export const SET_MAIN_ERROR: "SET_MAIN_ERROR" = "SET_MAIN_ERROR";
export const SET_ORDER_NUMBER: "SET_ORDER_NUMBER" = "SET_ORDER_NUMBER";
export const DELETE_INGREDIENT_FROM_INGREDIENTS: "DELETE_INGREDIENT_FROM_INGREDIENTS" =
  "DELETE_INGREDIENT_FROM_INGREDIENTS";
export const REPLACE_INNER_DRAG_INGREDIENT: "REPLACE_INNER_DRAG_INGREDIENT" =
  "REPLACE_INNER_DRAG_INGREDIENT";
export const SET_ADDED_INGREDIENT: "SET_ADDED_INGREDIENT" =
  "SET_ADDED_INGREDIENT";

export interface ISetDataAction {
  readonly type: typeof SET_DATA;
  data: Array<TData>;
}

export interface ISetMainErrorAction {
  readonly type: typeof SET_MAIN_ERROR;
  error: string;
}

export interface ISetOrderNumberAction {
  readonly type: typeof SET_ORDER_NUMBER;
  orderNumber: string | number;
}

export interface IDeleteIngredientFromIngredientsAction {
  readonly type: typeof DELETE_INGREDIENT_FROM_INGREDIENTS;
  key: string | number;
}

export interface IReplaceInnerDragIngredientAction {
  readonly type: typeof REPLACE_INNER_DRAG_INGREDIENT;
  dragIndex: number;
  hoverIndex: number;
}

export interface ISetAddedIngredientAction {
  readonly type: typeof SET_ADDED_INGREDIENT;
  ingredient: TData;
}

export type TAppActions =
  | ISetDataAction
  | ISetMainErrorAction
  | ISetOrderNumberAction
  | IDeleteIngredientFromIngredientsAction
  | IReplaceInnerDragIngredientAction
  | ISetAddedIngredientAction;

export const getData: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    return axios
      .get(getDataUrl)
      .then((data: any) => {
        dispatch({ type: SET_DATA, data: data.data.data });
      })
      .catch((error: any) =>
        dispatch({ type: SET_MAIN_ERROR, error: `${error}` })
      );
  };
};

export const getOrder: AppThunk = (ingredients: Array<TData>, bun: TData) => {
  return async function (dispatch: AppDispatch) {
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
        .then((data: any) => {
          dispatch({
            type: SET_ORDER_NUMBER,
            orderNumber: data.data.order.number,
          });
        })
        .then(() => {
          dispatch({ type: SET_REDIRECT_TO_ORDER_DETAILS });
          dispatch({ type: UNSET_REDIRECT_TO_ORDER_DETAILS });
        })
        .catch((error: any) =>
          dispatch({ type: SET_MAIN_ERROR, error: `${error}` })
        );
    }
  };
};
