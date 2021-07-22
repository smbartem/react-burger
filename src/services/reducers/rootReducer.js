import { combineReducers } from "redux";
import { interfaceReducer } from "./interface-reducer";
import { appReducer } from "./app-reducer";
import { authorizationReducer } from "./authorization-reducer";
import { wsOrderTypeReducer } from "./order-tape-reducer";

export const rootReducer = combineReducers({
  interfaceReducer,
  appReducer,
  authorizationReducer,
  wsOrderTypeReducer,
});
