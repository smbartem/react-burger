import { combineReducers } from "redux";
import { interfaceReducer } from "./interface-reducer";
import { appReducer } from "./app-reducer";

export const rootReducer = combineReducers({
  interfaceReducer,
  appReducer
});
