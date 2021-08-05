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

export type TInterfaceReducerState = {
  currentBurgerIngredientsName: string;
};

export type TAppReducerState = {
  data: [] | TData[];
  error: null | string;
  bun: null | TData;
  ingredients: [] | TData[];
  selectedIngredient: null | TData;
  orderNumber: null | number | string;
};

export type TData = {
  _id: string;
  name: string;
  type: string;
  proteins: string | number;
  fat: string | number;
  carbohydrates: string | number;
  calories: string | number;
  price: number;
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

export type TAuthorizationReducerState = {
  error: null | string;
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

export type TOrderHistoryReducerState = {
  wsOrderHistoryConnected: boolean;
  orders: null | TOrderData[];
  errorWSOrderHistory: null | string;
};

export type TOrderTapeReducerState = {
  wsOrderTapeConnected: boolean;
  total: null | string | number;
  totalToday: null | string | number;
  orders: null | TOrderData[],
  errorWSOrderTape: null | string,
};

export type TOrderIngredients = {
  order: TOrderData | null;
  handleModalClose?: () => void;
  isModal?: boolean;
  ingredients: {[k: string]: number} | undefined;
}

export type TOrderIngredientsModal = {
  order: TOrderData | null;
  handleModalClose: () => void;
  ingredients: {[k: string]: number} | undefined
}

export type TOrderBox = {
  element: TOrderData;
}

export type TModalWindow = {
  children: ReactNode;
  title: string;
  handleModalClose: () => void;
}

export type TIngredient = {
  data: TData;
  counter: null | number;
}

export type TBurgerConstructorInnerIngredients = {
  el: TData;
  index: number;
}