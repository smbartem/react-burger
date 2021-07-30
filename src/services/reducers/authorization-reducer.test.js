import {
  SET_FORM_NAME,
  SET_FORM_EMAIL,
  SET_FORM_PASSWORD,
  SET_LOGIN,
  SET_REDIRECT_TO_MAIN,
  UNSET_REDIRECT_TO_MAIN,
  SET_LOGOUT,
  SET_REDIRECT_TO_RESET_PASSWORD,
  UNSET_REDIRECT_TO_RESET_PASSWORD,
  SET_REDIRECT_TO_LOGIN,
  SET_CONFIRMATION_CODE,
  UNSET_ERROR,
  SET_ERROR,
  SET_REDIRECT_TO_LOGIN_FOR_ORDER,
  UNSET_REDIRECT_TO_LOGIN_FOR_ORDER,
  SET_REDIRECT_TO_ORDER_DETAILS,
  UNSET_REDIRECT_TO_ORDER_DETAILS,
} from "../actions/authorization-actions";

import { initialState, authorizationReducer } from "./authorization-reducer";

describe("authorizationReducer tests", () => {
  it("handle SET_LOGIN", () => {
    expect(authorizationReducer(initialState, { type: SET_LOGIN })).toEqual({
      ...initialState,
      authorized: true,
    });
  });
  it("handle SET_LOGOUT", () => {
    expect(authorizationReducer(initialState, { type: SET_LOGOUT })).toEqual({
      ...initialState,
    });
  });
  it("handle SET_FORM_NAME", () => {
    expect(
      authorizationReducer(initialState, {
        type: SET_FORM_NAME,
        formName: "testName",
      })
    ).toEqual({
      ...initialState,
      formName: "testName",
    });
  });
  it("handle SET_FORM_EMAIL", () => {
    expect(
      authorizationReducer(initialState, {
        type: SET_FORM_EMAIL,
        formEmail: "test@test.ru",
      })
    ).toEqual({
      ...initialState,
      formEmail: "test@test.ru",
    });
  });
  it("handle SET_FORM_PASSWORD", () => {
    expect(
      authorizationReducer(initialState, {
        type: SET_FORM_PASSWORD,
        formPassword: "****",
      })
    ).toEqual({
      ...initialState,
      formPassword: "****",
    });
  });
  it("handle SET_ERROR", () => {
    expect(
      authorizationReducer(initialState, {
        type: SET_ERROR,
        error: "****",
      })
    ).toEqual({
      ...initialState,
      error: "****",
    });
  });
  it("handle SET_REDIRECT_TO_MAIN", () => {
    expect(
      authorizationReducer(initialState, {
        type: SET_REDIRECT_TO_MAIN,
      })
    ).toEqual({
      ...initialState,
      redirectToMain: true,
    });
  });
  it("handle UNSET_REDIRECT_TO_MAIN", () => {
    expect(
      authorizationReducer(initialState, {
        type: UNSET_REDIRECT_TO_MAIN,
      })
    ).toEqual({
      ...initialState,
      redirectToMain: false,
    });
  });
  it("handle SET_REDIRECT_TO_RESET_PASSWORD", () => {
    expect(
      authorizationReducer(initialState, {
        type: SET_REDIRECT_TO_RESET_PASSWORD,
      })
    ).toEqual({
      ...initialState,
      redirectToResetPassword: true,
    });
  });
  it("handle UNSET_REDIRECT_TO_RESET_PASSWORD", () => {
    expect(
      authorizationReducer(initialState, {
        type: UNSET_REDIRECT_TO_RESET_PASSWORD,
      })
    ).toEqual({
      ...initialState,
      redirectToResetPassword: false,
    });
  });
  it("handle SET_REDIRECT_TO_LOGIN", () => {
    expect(
      authorizationReducer(initialState, {
        type: SET_REDIRECT_TO_LOGIN,
      })
    ).toEqual({
      ...initialState,
      redirectToLogin: true,
    });
  });
  it("handle SET_REDIRECT_TO_LOGIN_FOR_ORDER", () => {
    expect(
      authorizationReducer(initialState, {
        type: SET_REDIRECT_TO_LOGIN_FOR_ORDER,
      })
    ).toEqual({
      ...initialState,
      redirectToLoginForOrder: true,
    });
  });
  it("handle UNSET_REDIRECT_TO_LOGIN_FOR_ORDER", () => {
    expect(
      authorizationReducer(initialState, {
        type: UNSET_REDIRECT_TO_LOGIN_FOR_ORDER,
      })
    ).toEqual({
      ...initialState,
      redirectToLoginForOrder: false,
    });
  });
  it("handle SET_REDIRECT_TO_ORDER_DETAILS", () => {
    expect(
      authorizationReducer(initialState, {
        type: SET_REDIRECT_TO_ORDER_DETAILS,
      })
    ).toEqual({
      ...initialState,
      redirectToOrderDetails: true
    });
  });
  it("handle UNSET_REDIRECT_TO_ORDER_DETAILS", () => {
    expect(
      authorizationReducer(initialState, {
        type: UNSET_REDIRECT_TO_ORDER_DETAILS,
      })
    ).toEqual({
      ...initialState,
      redirectToOrderDetails: false
    });
  });
  it("handle SET_CONFIRMATION_CODE", () => {
    expect(
      authorizationReducer(initialState, {
        type: SET_CONFIRMATION_CODE,
        formConfirmationCode: 'test'
      })
    ).toEqual({
      ...initialState,
      formConfirmationCode: 'test'
    });
  });
  it("handle UNSET_ERROR", () => {
    expect(
      authorizationReducer(initialState, {
        type: UNSET_ERROR,
      })
    ).toEqual({
      ...initialState,
      error: null
    });
  });
});
