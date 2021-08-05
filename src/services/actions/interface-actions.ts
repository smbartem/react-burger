export const SET_CURRENT_BURGER_INGREDIENTS_NAME: "SET_CURRENT_BURGER_INGREDIENTS_NAME" =
  "SET_CURRENT_BURGER_INGREDIENTS_NAME";

export interface IInterfaceAction {
  readonly type: typeof SET_CURRENT_BURGER_INGREDIENTS_NAME;
  ingredientsName: string;
}

export type TInterfaceAction = IInterfaceAction;
