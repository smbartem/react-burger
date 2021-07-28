import {
  SET_DATA,
  SET_MAIN_ERROR,
  SET_ORDER_NUMBER,
  DELETE_INGREDIENT_FROM_INGREDIENTS,
  REPLACE_INNER_DRAG_INGREDIENT,
  SET_ADDED_INGREDIENT,
} from "../actions/app-actions";
import { initialState, appReducer } from "./app-reducer";

describe("appReducer tests", () => {
  it("handle SET_DATA", () => {
    expect(
      appReducer(initialState, { type: SET_DATA, data: [1, 2, 3] })
    ).toEqual({
      ...initialState,
      data: [1, 2, 3],
    });
  });
  it("handle SET_MAIN_ERROR", () => {
    expect(
      appReducer(initialState, { type: SET_MAIN_ERROR, error: "test error" })
    ).toEqual({
      ...initialState,
      error: "test error",
    });
  });
  it("handle SET_ADDED_INGREDIENT with bun", () => {
    expect(
      appReducer(initialState, { type: SET_ADDED_INGREDIENT, ingredient: { type: "bun", name: "bun" } })
    ).toEqual({
      ...initialState,
      bun: { type: "bun", name: "bun" },
    });
  });
  it("handle SET_ADDED_INGREDIENT without bun", () => {
    expect(
      appReducer(initialState, { type: SET_ADDED_INGREDIENT, ingredient: { type: "not bun", name: "not bun" } })
    ).toEqual({
      ...initialState,
      ingredients: [{ "key": "1", type: "not bun", name: "not bun" }],
    });
  });
  it("handle SET_ORDER_NUMBER", () => {
    expect(
      appReducer({
        ...initialState, bun: {type: 'bun', name: 'bun'},
        ingredients: [1, 2, 3],
      }, { type: SET_ORDER_NUMBER, orderNumber: '1111' })
    ).toEqual({
      ...initialState,
      orderNumber: '1111',
    });
  });
  it("handle DELETE_INGREDIENT_FROM_INGREDIENTS", () => {
    expect(
      appReducer({
        ...initialState,
        ingredients: [{ "key": "1" }, { "key": "2" }, { "key": "3" }],
      }, { type: DELETE_INGREDIENT_FROM_INGREDIENTS, key: '2' })
    ).toEqual({
      ...initialState,
      ingredients: [{ "key": "1" }, { "key": "3" }],
    });
  });
  it("handle REPLACE_INNER_DRAG_INGREDIENT", () => {
    expect(
      appReducer({
        ...initialState,
        ingredients: [{ "key": "1" }, { "key": "2" }],
      }, { type: REPLACE_INNER_DRAG_INGREDIENT, dragIndex: 1, hoverIndex: 0 })
    ).toEqual({
      ...initialState,
      ingredients: [{ "key": "2" }, { "key": "1" } ],
    });
  });
});
