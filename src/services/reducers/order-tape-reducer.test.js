import {
  WS_ORDER_TAPE_CONNECTION_SUCCESS,
  WS_ORDER_TAPE_GET_MESSAGE,
  WS_ORDER_TAPE_CONNECTION_ERROR,
  WS_ORDER_TAPE_CONNECTION_CLOSED,
} from "../actions/order-tape-actions";
import { wsOrderTapeReducer, initialState } from "./order-tape-reducer";

describe("wsOrderTapeReducer tests", () => {
  it("handle WS_ORDER_TAPE_CONNECTION_SUCCESS", () => {
    expect(
      wsOrderTapeReducer(initialState, {
        type: WS_ORDER_TAPE_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsOrderTapeConnected: true,
      errorWSOrderTape: null,
    });
  });
  it("handle WS_ORDER_TAPE_GET_MESSAGE", () => {
    expect(
      wsOrderTapeReducer(initialState, {
        type: WS_ORDER_TAPE_GET_MESSAGE,
        payload: {
          total: 1,
          totalToday: 2,
          orders: [{ key: 1 }, { key: 2 }],
        },
      })
    ).toEqual({
      ...initialState,
      total: 1,
      totalToday: 2,
      orders: [{ key: 1 }, { key: 2 }],
    });
  });
  it("handle WS_ORDER_TAPE_CONNECTION_ERROR", () => {
    expect(
      wsOrderTapeReducer(initialState, {
        type: WS_ORDER_TAPE_CONNECTION_ERROR,
      })
    ).toEqual({
      ...initialState,
      errorWSOrderTape: "Ошибка соединения. Попробуйте перезагрузить страницу",
      wsOrderTapeConnected: false,
    });
  });
  it("handle WS_ORDER_TAPE_CONNECTION_CLOSED", () => {
    expect(
      wsOrderTapeReducer(initialState, {
        type: WS_ORDER_TAPE_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      wsOrderTapeConnected: false,
    });
  });
});
