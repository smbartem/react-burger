import {
  SET_CURRENT_BURGER_INGREDIENTS_NAME,
  IInterfaceAction,
} from "../actions/interface-actions";
import { TInterfaceReducerState } from "../types";

export const initialState: TInterfaceReducerState = {
  currentBurgerIngredientsName: "Булки",
};

export const interfaceReducer = (
  state = initialState,
  action: IInterfaceAction
): TInterfaceReducerState => {
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
