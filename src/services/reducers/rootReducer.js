import { combineReducers } from "redux";
import { interfaceReducer } from "./interface-reducer";
import { appReducer } from "./app-reducer";
import { authorizationReducer } from "./authorization-reducer";
import { wsOrderTapeReducer } from "./order-tape-reducer";
import { wsOrderHistoryReducer } from "./order-history-reducer";

export const rootReducer = combineReducers({
  interfaceReducer,
  appReducer,
  authorizationReducer,
  wsOrderTapeReducer,
  wsOrderHistoryReducer,
});
