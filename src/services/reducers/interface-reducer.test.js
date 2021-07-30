import { SET_CURRENT_BURGER_INGREDIENTS_NAME } from "../actions/interface-actions";
import { initialState, interfaceReducer } from "./interface-reducer";

describe("interfaceReducer test", () => {
  it("handle SET_CURRENT_BURGER_INGREDIENTS_NAME", () => {
    expect(
      interfaceReducer(initialState, {
        type: SET_CURRENT_BURGER_INGREDIENTS_NAME,
        ingredientsName: "Соусы",
      })
    ).toEqual({
      ...initialState,
      currentBurgerIngredientsName: "Соусы",
    });
  });
});
