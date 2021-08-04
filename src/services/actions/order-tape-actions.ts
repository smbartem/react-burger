import { AnyAction, MiddlewareAPI } from "redux";
import { TOrderData } from "../types";
const url = "wss://norma.nomoreparties.space/orders/all";

export const WS_ORDER_TAPE_CONNECTION_INIT: "WS_ORDER_TAPE_CONNECTION_INIT" =
  "WS_ORDER_TAPE_CONNECTION_INIT";
export const WS_ORDER_TAPE_CONNECTION_SUCCESS: "WS_ORDER_TAPE_CONNECTION_SUCCESS" =
  "WS_ORDER_TAPE_CONNECTION_SUCCESS";
export const WS_ORDER_TAPE_CONNECTION_ERROR: "WS_ORDER_TAPE_CONNECTION_ERROR" =
  "WS_ORDER_TAPE_CONNECTION_ERROR";
export const WS_ORDER_TAPE_CONNECTION_CLOSED: "WS_ORDER_TAPE_CONNECTION_CLOSED" =
  "WS_ORDER_TAPE_CONNECTION_CLOSED";
export const WS_ORDER_TAPE_GET_MESSAGE: "WS_ORDER_TAPE_GET_MESSAGE" =
  "WS_ORDER_TAPE_GET_MESSAGE";

export interface IOrderTapeConnectionInitAction {
  readonly type: typeof WS_ORDER_TAPE_CONNECTION_INIT;
}

export interface IOrderTapeConnectionSuccessAction {
  readonly type: typeof WS_ORDER_TAPE_CONNECTION_SUCCESS;
}

export interface IOrderTapeConnectionErrorAction {
  readonly type: typeof WS_ORDER_TAPE_CONNECTION_ERROR;
}

export interface IOrderTapeConnectionConnectionClosedAction {
  readonly type: typeof WS_ORDER_TAPE_CONNECTION_CLOSED;
}

export interface IOrderTapeConnectionGetMessageAction {
  readonly type: typeof WS_ORDER_TAPE_GET_MESSAGE;
  payload: {
    total: number;
    totalToday: number;
    orders: Array<TOrderData>;
  };
}

export type TOrderTapeActions =
  | IOrderTapeConnectionInitAction
  | IOrderTapeConnectionSuccessAction
  | IOrderTapeConnectionErrorAction
  | IOrderTapeConnectionConnectionClosedAction
  | IOrderTapeConnectionGetMessageAction;

export const orderTapeSocketMiddleware = () => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (i: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type } = action;
      if (type === WS_ORDER_TAPE_CONNECTION_INIT) {
        socket = new WebSocket(url);
      }

      if (type === WS_ORDER_TAPE_CONNECTION_CLOSED) {
        socket?.close();
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: WS_ORDER_TAPE_CONNECTION_SUCCESS, payload: event });
        };
        socket.onmessage = (event) => {
          const { total, totalToday, orders } = JSON.parse(event.data);
          dispatch({
            type: WS_ORDER_TAPE_GET_MESSAGE,
            payload: { total, totalToday, orders },
          });
        };
        socket.onerror = (event) => {
          dispatch({ type: WS_ORDER_TAPE_CONNECTION_ERROR, payload: event });
        };
        socket.onclose = (event) => {
          dispatch({ type: WS_ORDER_TAPE_CONNECTION_CLOSED, payload: event });
        };
      }

      next(action);
    };
  };
};
