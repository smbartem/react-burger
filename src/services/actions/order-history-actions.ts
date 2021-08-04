import { AnyAction, MiddlewareAPI } from "redux";
import { getCookie } from "../utils";
import { refreshAccessToken } from "./authorization-actions";
import { TOrderData } from "../types";
const url = "wss://norma.nomoreparties.space/orders";

export const WS_ORDER_HISTORY_CONNECTION_INIT: "WS_ORDER_HISTORY_CONNECTION_INIT" =
  "WS_ORDER_HISTORY_CONNECTION_INIT";
export const WS_ORDER_HISTORY_CONNECTION_SUCCESS: "WS_ORDER_HISTORY_CONNECTION_SUCCESS" =
  "WS_ORDER_HISTORY_CONNECTION_SUCCESS";
export const WS_ORDER_HISTORY_CONNECTION_ERROR: "WS_ORDER_HISTORY_CONNECTION_ERROR" =
  "WS_ORDER_HISTORY_CONNECTION_ERROR";
export const WS_ORDER_HISTORY_CONNECTION_CLOSED: "WS_ORDER_HISTORY_CONNECTION_CLOSED" =
  "WS_ORDER_HISTORY_CONNECTION_CLOSED";
export const WS_ORDER_HISTORY_GET_MESSAGE: "WS_ORDER_HISTORY_GET_MESSAGE" =
  "WS_ORDER_HISTORY_GET_MESSAGE";

export interface IOrderHistoryConnectionInitAction {
  readonly type: typeof WS_ORDER_HISTORY_CONNECTION_INIT;
}

export interface IOrderHistoryConnectionSuccessAction {
  readonly type: typeof WS_ORDER_HISTORY_CONNECTION_SUCCESS;
}

export interface IOrderHistoryConnectionErrorAction {
  readonly type: typeof WS_ORDER_HISTORY_CONNECTION_ERROR;
}

export interface IOrderHistoryConnectionClosedAction {
  readonly type: typeof WS_ORDER_HISTORY_CONNECTION_CLOSED;
}

export interface IOrderHistoryConnectionGetMessageAction {
  readonly type: typeof WS_ORDER_HISTORY_GET_MESSAGE;
  payload: Array<TOrderData>;
}

export type TOrderHistoryActions =
  | IOrderHistoryConnectionInitAction
  | IOrderHistoryConnectionSuccessAction
  | IOrderHistoryConnectionErrorAction
  | IOrderHistoryConnectionClosedAction
  | IOrderHistoryConnectionGetMessageAction;

export const orderHistorySocketMiddleware = () => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (i: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type } = action;
      if (type === WS_ORDER_HISTORY_CONNECTION_INIT) {
        const accessToken = getCookie("accessToken");
        socket = new WebSocket(`${url}?token=${accessToken}`);
      }
      if (type === WS_ORDER_HISTORY_CONNECTION_CLOSED) {
        socket?.close();
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({
            type: WS_ORDER_HISTORY_CONNECTION_SUCCESS,
            payload: event,
          });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          if (
            restParsedData.message &&
            restParsedData.message === "jwt expired"
          ) {
            refreshAccessToken(dispatch).then(() =>
              dispatch({ type: WS_ORDER_HISTORY_CONNECTION_INIT })
            );
          } else {
            dispatch({
              type: WS_ORDER_HISTORY_GET_MESSAGE,
              payload: [...restParsedData.orders].reverse(),
            });
          }
        };
        socket.onerror = (event) => {
          dispatch({ type: WS_ORDER_HISTORY_CONNECTION_ERROR, payload: event });
        };
        socket.onclose = (event) => {
          dispatch({
            type: WS_ORDER_HISTORY_CONNECTION_CLOSED,
            payload: event,
          });
        };
      }

      next(action);
    };
  };
};
