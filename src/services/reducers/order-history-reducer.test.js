import {
  WS_ORDER_HISTORY_CONNECTION_SUCCESS,
  WS_ORDER_HISTORY_GET_MESSAGE,
  WS_ORDER_HISTORY_CONNECTION_ERROR,
  WS_ORDER_HISTORY_CONNECTION_CLOSED,
} from "../actions/order-history-actions";

import { wsOrderHistoryReducer, initialState } from "./order-history-reducer";

describe("wsOrderHistoryReducer tests", () => {
  it("handle WS_ORDER_HISTORY_CONNECTION_SUCCESS", () => {
    expect(
      wsOrderHistoryReducer(initialState, {
        type: WS_ORDER_HISTORY_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsOrderHistoryConnected: true,
      errorWSOrderHistory: null,
    });
  });
  it("handle WS_ORDER_HISTORY_GET_MESSAGE", () => {
    expect(
      wsOrderHistoryReducer(initialState, {
        type: WS_ORDER_HISTORY_GET_MESSAGE,
        payload: [{ key: 1 }, { key: 2 }, { key: 3 }],
      })
    ).toEqual({
      ...initialState,
      orders: [{ key: 1 }, { key: 2 }, { key: 3 }],
    });
  });
  it("handle WS_ORDER_HISTORY_CONNECTION_ERROR", () => {
    expect(
      wsOrderHistoryReducer(initialState, {
        type: WS_ORDER_HISTORY_CONNECTION_ERROR,
      })
    ).toEqual({
      ...initialState,
      errorWSOrderHistory:
        "Ошибка соединения. Попробуйте перезагрузить страницу, отключить блокировщик рекламы и перелогиниться",
      wsOrderHistoryConnected: false,
    });
  });
  it("handle WS_ORDER_HISTORY_CONNECTION_CLOSED", () => {
    expect(
      wsOrderHistoryReducer(initialState, {
        type: WS_ORDER_HISTORY_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      wsOrderHistoryConnected: false,
    });
  });
});
