import { ReactNode } from "react";
import { Action, ActionCreator } from "redux";
import { store } from "../../index";
import { ThunkAction } from "redux-thunk";
import { TAppActions } from "../actions/app-actions";
import { TAuthorizationActions } from "../actions/authorization-actions";
import { TOrderHistoryActions } from "../actions/order-history-actions";
import { TInterfaceAction } from "../actions/interface-actions";
import { TOrderTapeActions } from "../actions/order-tape-actions";

export type TCookiePropsType = {
  expires?: number | string;
  path?: string;
} & { [extraParams: string]: string | number | boolean };

export type TInterfaceReducerInitialState = {
  currentBurgerIngredientsName: string;
};

export type TAppReducerInitialState = {
  data: null;
  error: null;
  bun: null;
  ingredients: [];
  selectedIngredient: null;
  orderNumber: null;
};

export type TData = {
  _id: string;
  name: string;
  type: string;
  proteins: string | number;
  fat: string | number;
  carbohydrates: string | number;
  calories: string | number;
  price: string | number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: string | number;
  key?: string | number;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type TApplicationActions =
  | TAppActions
  | TAuthorizationActions
  | TOrderHistoryActions
  | TInterfaceAction
  | TOrderTapeActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type TAuthorizationReducerInitialState = {
  error: null;
  formName: string;
  formEmail: string;
  formPassword: string;
  redirectToMain: boolean;
  redirectToResetPassword: boolean;
  redirectToLogin: boolean;
  redirectToLoginForOrder: boolean;
  formConfirmationCode: string;
  authorized: boolean;
  redirectToOrderDetails: boolean;
};

export type TOrderData = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TOrderHistoryReducerInitialState = {
  wsOrderHistoryConnected: boolean;
  orders: null;
  errorWSOrderHistory: null;
};

export type TOrderIngredients = {
  order: TOrderData;
  handleModalClose?: () => void;
  isModal?: boolean;
  ingredients: {[k: string]: number}
}

export type TOrderIngredientsModal = {
  order: TOrderData;
  handleModalClose: () => void;
  ingredients: {[k: string]: number}
}

export type TOrderBox = {
  element: TOrderData;
}

export type TModalWindow = {
  children: ReactNode;
  title: string;
  handleModalClose: () => void;
}