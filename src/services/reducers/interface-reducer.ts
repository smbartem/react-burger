import {
  SET_CURRENT_BURGER_INGREDIENTS_NAME,
  IInterfaceAction,
} from "../actions/interface-actions";
import { TInterfaceReducerInitialState } from "../types";

export const initialState: TInterfaceReducerInitialState = {
  currentBurgerIngredientsName: "Булки",
};

export const interfaceReducer = (
  state = initialState,
  action: IInterfaceAction
) => {
  switch (action.type) {
    case SET_CURRENT_BURGER_INGREDIENTS_NAME: {
      return {
        ...state,
        currentBurgerIngredientsName: action.ingredientsName,
      };
    }
    default: {
      return state;
    }
  }
};
