import { getCookie } from "../utils";
import { refreshAccessToken } from "./authorization-actions";

const url = "wss://norma.nomoreparties.space/orders";

export const WS_ORDER_HISTORY_CONNECTION_INIT =
  "WS_ORDER_HISTORY_CONNECTION_INIT";
export const WS_ORDER_HISTORY_CONNECTION_SUCCESS =
  "WS_ORDER_HISTORY_CONNECTION_SUCCESS";
export const WS_ORDER_HISTORY_CONNECTION_ERROR =
  "WS_ORDER_HISTORY_CONNECTION_ERROR";
export const WS_ORDER_HISTORY_CONNECTION_CLOSED =
  "WS_ORDER_HISTORY_CONNECTION_CLOSED";
export const WS_ORDER_HISTORY_GET_MESSAGE = "WS_ORDER_HISTORY_GET_MESSAGE";

export const orderHistorySocketMiddleware = () => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      if (type === WS_ORDER_HISTORY_CONNECTION_INIT) {
        const accessToken = getCookie("accessToken");
        socket = new WebSocket(`${url}?token=${accessToken}`);
      }
      if (type === WS_ORDER_HISTORY_CONNECTION_CLOSED) {
        socket.close();
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
            refreshAccessToken().then(() =>
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
