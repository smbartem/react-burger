import {
  WS_ORDER_HISTORY_CONNECTION_SUCCESS,
  WS_ORDER_HISTORY_GET_MESSAGE,
  WS_ORDER_HISTORY_CONNECTION_ERROR,
  WS_ORDER_HISTORY_CONNECTION_CLOSED,
} from "../actions/order-history-actions";

export const initialState = {
  wsOrderHistoryConnected: false,
  orders: null,
  errorWSOrderHistory: null,
};

export const wsOrderHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_ORDER_HISTORY_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsOrderHistoryConnected: true,
        errorWSOrderHistory: null,
      };
    }
    case WS_ORDER_HISTORY_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload
      };
    }
    case WS_ORDER_HISTORY_CONNECTION_ERROR: {
      return {
        ...state,
        errorWSOrderHistory:
          "Ошибка соединения. Попробуйте перезагрузить страницу, отключить блокировщик рекламы и перелогиниться",
        wsOrderTapeConnected: false,
      };
    }
    case WS_ORDER_HISTORY_CONNECTION_CLOSED: {
      return {
        ...state,
        wsOrderHistoryConnected: false,
      };
    }
    default: {
      return state;
    }
  }
};
