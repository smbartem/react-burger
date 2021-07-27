const url = "wss://norma.nomoreparties.space/orders/all";

export const WS_ORDER_TAPE_CONNECTION_INIT = "WS_ORDER_TAPE_CONNECTION_INIT";
export const WS_ORDER_TAPE_CONNECTION_SUCCESS =
  "WS_ORDER_TAPE_CONNECTION_SUCCESS";
export const WS_ORDER_TAPE_CONNECTION_ERROR = "WS_ORDER_TAPE_CONNECTION_ERROR";
export const WS_ORDER_TAPE_CONNECTION_CLOSED =
  "WS_ORDER_TAPE_CONNECTION_CLOSED";
export const WS_ORDER_TAPE_GET_MESSAGE = "WS_ORDER_TAPE_GET_MESSAGE";

export const orderTapeSocketMiddleware = () => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      if (type === WS_ORDER_TAPE_CONNECTION_INIT) {
        socket = new WebSocket(url);
      }

      if (type === WS_ORDER_TAPE_CONNECTION_CLOSED) {
        socket.close();
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: WS_ORDER_TAPE_CONNECTION_SUCCESS, payload: event });
        };
        socket.onmessage = (event) => {
          dispatch({ type: WS_ORDER_TAPE_GET_MESSAGE, payload: event.data });
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
