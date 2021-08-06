import { TOrderTapeActions } from "../actions/order-tape-actions";
import { TOrderTapeReducerState } from "../types";
import {
  WS_ORDER_TAPE_CONNECTION_SUCCESS,
  WS_ORDER_TAPE_GET_MESSAGE,
  WS_ORDER_TAPE_CONNECTION_ERROR,
  WS_ORDER_TAPE_CONNECTION_CLOSED,
} from "../actions/order-tape-actions";

export const initialState: TOrderTapeReducerState = {
  wsOrderTapeConnected: false,
  total: null,
  totalToday: null,
  orders: null,
  errorWSOrderTape: null,
};

export const wsOrderTapeReducer = (
  state = initialState,
  action: TOrderTapeActions
): TOrderTapeReducerState => {
  switch (action.type) {
    case WS_ORDER_TAPE_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsOrderTapeConnected: true,
        errorWSOrderTape: null,
      };
    }
    case WS_ORDER_TAPE_GET_MESSAGE: {
      const { total, totalToday, orders } = action.payload;
      return {
        ...state,
        total,
        totalToday,
        orders,
      };
    }
    case WS_ORDER_TAPE_CONNECTION_ERROR: {
      return {
        ...state,
        errorWSOrderTape:
          "Ошибка соединения. Попробуйте перезагрузить страницу",
        wsOrderTapeConnected: false,
      };
    }
    case WS_ORDER_TAPE_CONNECTION_CLOSED: {
      return {
        ...state,
        wsOrderTapeConnected: false,
      };
    }
    default: {
      return state;
    }
  }
};
