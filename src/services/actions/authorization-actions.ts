import { setCookie, getCookie, deleteCookie } from "../utils";
import { WS_ORDER_HISTORY_CONNECTION_CLOSED } from "./order-history-actions";
import { AppDispatch, AppThunk } from "../types";
const axios = require("axios");

const COOKIE_EXPIRE_SEC = 1200;

const registerUrl = "https://norma.nomoreparties.space/api/auth/register"; //- эндпоинт для регистрации пользователя.
const authorizationUrl = "https://norma.nomoreparties.space/api/auth/login"; //- эндпоинт для авторизации.
const logoutUrl = "https://norma.nomoreparties.space/api/auth/logout"; //- эндпоинт для выхода из системы.
const tokenRefreshUrl = "https://norma.nomoreparties.space/api/auth/token"; //- эндпоинт обновления токена.
const restorePasswordUrl =
  "https://norma.nomoreparties.space/api/password-reset"; // - эндпоинт восстановления пароля.
const setNewPasswordUrl =
  "https://norma.nomoreparties.space/api/password-reset/reset"; // - эндпоинт установки нового пароля пароля.
const userDataUrl = "https://norma.nomoreparties.space/api/auth/user"; // - эндпоинт получения данных о пользователе и обновления данных о пользователе.

export const SET_FORM_NAME: "SET_FORM_NAME" = "SET_FORM_NAME";
export const SET_FORM_EMAIL: "SET_FORM_EMAIL" = "SET_FORM_EMAIL";
export const SET_FORM_PASSWORD: "SET_FORM_PASSWORD" = "SET_FORM_PASSWORD";
export const SET_LOGIN: "SET_LOGIN" = "SET_LOGIN";
export const SET_ERROR: "SET_ERROR" = "SET_ERROR";
export const SET_REDIRECT_TO_MAIN: "SET_REDIRECT_TO_MAIN" =
  "SET_REDIRECT_TO_MAIN";
export const UNSET_REDIRECT_TO_MAIN: "UNSET_REDIRECT_TO_MAIN" =
  "UNSET_REDIRECT_TO_MAIN";
export const SET_LOGOUT: "SET_LOGOUT" = "SET_LOGOUT";
export const SET_REDIRECT_TO_RESET_PASSWORD: "SET_REDIRECT_TO_RESET_PASSWORD" =
  "SET_REDIRECT_TO_RESET_PASSWORD";
export const UNSET_REDIRECT_TO_RESET_PASSWORD: "UNSET_REDIRECT_TO_RESET_PASSWORD" =
  "UNSET_REDIRECT_TO_RESET_PASSWORD";
export const SET_REDIRECT_TO_LOGIN: "SET_REDIRECT_TO_LOGIN" =
  "SET_REDIRECT_TO_LOGIN";
export const SET_CONFIRMATION_CODE: "SET_CONFIRMATION_CODE" =
  "SET_CONFIRMATION_CODE";
export const UNSET_ERROR: "UNSET_ERROR" = "UNSET_ERROR";
export const UNSET_REDIRECT_TO_LOGIN: "UNSET_REDIRECT_TO_LOGIN" =
  "UNSET_REDIRECT_TO_LOGIN";
export const SET_REDIRECT_TO_LOGIN_FOR_ORDER: "SET_REDIRECT_TO_LOGIN_FOR_ORDER" =
  "SET_REDIRECT_TO_LOGIN_FOR_ORDER";
export const UNSET_REDIRECT_TO_LOGIN_FOR_ORDER: "UNSET_REDIRECT_TO_LOGIN_FOR_ORDER" =
  "UNSET_REDIRECT_TO_LOGIN_FOR_ORDER";
export const SET_REDIRECT_TO_ORDER_DETAILS: "SET_REDIRECT_TO_ORDER_DETAILS" =
  "SET_REDIRECT_TO_ORDER_DETAILS";
export const UNSET_REDIRECT_TO_ORDER_DETAILS: "UNSET_REDIRECT_TO_ORDER_DETAILS" =
  "UNSET_REDIRECT_TO_ORDER_DETAILS";

export interface ISetFormNameAction {
  readonly type: typeof SET_FORM_NAME;
  formName: string;
}

export interface ISetFormEmailAction {
  readonly type: typeof SET_FORM_EMAIL;
  formEmail: string;
}

export interface ISetFormPasswordAction {
  readonly type: typeof SET_FORM_PASSWORD;
  formPassword: string;
}

export interface ISetLoginAction {
  readonly type: typeof SET_LOGIN;
}

export interface ISetErrorAction {
  readonly type: typeof SET_ERROR;
  error: string;
}

export interface ISetRedirectToMainAction {
  readonly type: typeof SET_REDIRECT_TO_MAIN;
}

export interface IUnsetRedirectToMainAction {
  readonly type: typeof UNSET_REDIRECT_TO_MAIN;
}

export interface ISetLogoutAction {
  readonly type: typeof SET_LOGOUT;
}

export interface ISetRedirectToResetPasswordAction {
  readonly type: typeof SET_REDIRECT_TO_RESET_PASSWORD;
}

export interface IUnsetRedirectToResetPasswordAction {
  readonly type: typeof UNSET_REDIRECT_TO_RESET_PASSWORD;
}

export interface ISetRedirectToLoginAction {
  readonly type: typeof SET_REDIRECT_TO_LOGIN;
}

export interface ISetConfirmationCodeAction {
  readonly type: typeof SET_CONFIRMATION_CODE;
  formConfirmationCode: string;
}

export interface IUnsetErrorAction {
  readonly type: typeof UNSET_ERROR;
}

export interface IUnsetRedirectToLoginAction {
  readonly type: typeof UNSET_REDIRECT_TO_LOGIN;
}

export interface ISetRedirectToLoginForOrderAction {
  readonly type: typeof SET_REDIRECT_TO_LOGIN_FOR_ORDER;
}

export interface IUnsetRedirectToLoginForOrderAction {
  readonly type: typeof UNSET_REDIRECT_TO_LOGIN_FOR_ORDER;
}

export interface ISetRedirectToOrderDetailsAction {
  readonly type: typeof SET_REDIRECT_TO_ORDER_DETAILS;
}

export interface IUnsetRedirectToOrderDetailsAction {
  readonly type: typeof UNSET_REDIRECT_TO_ORDER_DETAILS;
}

export type TAuthorizationActions =
  | ISetFormNameAction
  | ISetFormEmailAction
  | ISetFormPasswordAction
  | ISetLoginAction
  | ISetErrorAction
  | ISetRedirectToMainAction
  | IUnsetRedirectToMainAction
  | ISetLogoutAction
  | ISetRedirectToResetPasswordAction
  | IUnsetRedirectToResetPasswordAction
  | ISetRedirectToLoginAction
  | ISetConfirmationCodeAction
  | IUnsetErrorAction
  | IUnsetRedirectToLoginAction
  | ISetRedirectToLoginForOrderAction
  | IUnsetRedirectToLoginForOrderAction
  | ISetRedirectToOrderDetailsAction
  | IUnsetRedirectToOrderDetailsAction;

export const refreshAccessToken = (dispatch: AppDispatch) => {
  return axios
    .post(tokenRefreshUrl, {
      token: `${getCookie("refreshToken")}`,
    })
    .then((data: any) => {
      const accessToken = data.data.accessToken.split("Bearer ")[1];
      const refreshToken = data.data.refreshToken;
      setCookie("accessToken", accessToken, { expires: COOKIE_EXPIRE_SEC });
      setCookie("refreshToken", refreshToken);
    })
    .catch((error: any) => catchError(dispatch, error));
};

const setForm = (
  dispatch: AppDispatch,
  name = "",
  email = "",
  password = ""
) => {
  dispatch({
    type: SET_FORM_NAME,
    formName: name,
  });
  dispatch({
    type: SET_FORM_EMAIL,
    formEmail: email,
  });
  dispatch({
    type: SET_FORM_PASSWORD,
    formPassword: password,
  });
};

const catchError = (dispatch: AppDispatch, error: any) => {
  const errorDescription = error.response?.data.message
    ? error.response.data.message
    : "Ошибка операции";
  dispatch({
    type: SET_ERROR,
    error: errorDescription,
  });
};

export const register: AppThunk = (
  email: string,
  password: string,
  name: string
) => {
  return function (dispatch: AppDispatch) {
    axios
      .post(registerUrl, {
        email,
        password,
        name,
      })
      .then((data: any) => {
        const accessToken = data.data.accessToken.split("Bearer ")[1];
        const refreshToken = data.data.refreshToken;
        setCookie("accessToken", accessToken, { expires: COOKIE_EXPIRE_SEC });
        setCookie("refreshToken", refreshToken);
        dispatch({ type: SET_REDIRECT_TO_MAIN });
        dispatch({ type: UNSET_REDIRECT_TO_MAIN });
      })
      .catch((error: any) => catchError(dispatch, error))
      .finally(() => setForm(dispatch));
  };
};

export const makeLogin: AppThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    axios
      .post(authorizationUrl, {
        email,
        password,
      })
      .then((data: any) => {
        const accessToken = data.data.accessToken.split("Bearer ")[1];
        const refreshToken = data.data.refreshToken;
        setCookie("accessToken", accessToken, { expires: COOKIE_EXPIRE_SEC });
        setCookie("refreshToken", refreshToken);
        dispatch({ type: SET_REDIRECT_TO_MAIN });
        dispatch({
          type: SET_LOGIN,
        });
        dispatch({ type: UNSET_REDIRECT_TO_MAIN });
      })
      .catch((error: any) => catchError(dispatch, error))
      .finally(() => setForm(dispatch));
  };
};

export const makeLogout: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    axios
      .post(logoutUrl, {
        token: `${getCookie("refreshToken")}`,
      })
      .then(() => {
        dispatch({ type: SET_REDIRECT_TO_LOGIN });
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
        dispatch({ type: SET_LOGOUT });
        dispatch({ type: WS_ORDER_HISTORY_CONNECTION_CLOSED });
      })
      .catch((error: any) => catchError(dispatch, error));
  };
};

export const restorePassword: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
    axios
      .post(restorePasswordUrl, {
        email,
      })
      .then(() => {
        dispatch({ type: SET_REDIRECT_TO_RESET_PASSWORD });
      })
      .catch((error: any) => catchError(dispatch, error));
  };
};

export const setNewPassword: AppThunk = (password: string, token: string) => {
  return function (dispatch: AppDispatch) {
    axios
      .post(setNewPasswordUrl, {
        password,
        token,
      })
      .then(() => {
        dispatch({ type: SET_REDIRECT_TO_LOGIN });
        dispatch({ type: SET_LOGOUT });
      })
      .catch((error: any) => catchError(dispatch, error));
  };
};

export const getUserData: AppThunk = () => {
  return async function (dispatch: AppDispatch) {
    if (getCookie("accessToken")) {
      axios
        .get(userDataUrl, {
          headers: {
            authorization: `Bearer ${getCookie("accessToken")}`,
          },
        })
        .then((data: any) => {
          setForm(
            dispatch,
            data.data.user.name,
            data.data.user.email,
            "********"
          );
          dispatch({ type: SET_LOGIN });
        })
        .catch((error: any) => {
          if (error.response?.data.message === "Token is invalid") {
            refreshAccessToken(dispatch);
            getUserData();
          } else {
            catchError(dispatch, error);
          }
        });
    } else {
      if (getCookie("refreshToken")) {
        refreshAccessToken(dispatch);
        getUserData();
      }
    }
  };
};

export const changeUserData: AppThunk = (
  email: string,
  password: string,
  name: string
) => {
  return async function (dispatch: AppDispatch) {
    axios
      .patch(
        userDataUrl,
        {
          email,
          password,
          name,
        },
        {
          headers: {
            authorization: `Bearer ${getCookie("accessToken")}`,
          },
        }
      )
      .then((data: any) => {
        setForm(
          dispatch,
          data.data.user.name,
          data.data.user.email,
          "********"
        );
        dispatch({ type: SET_LOGIN });
      })
      .catch((error: any) => {
        if (error.response.data.message === "jwt expired") {
          refreshAccessToken(dispatch);
          getUserData();
        } else {
          catchError(dispatch, error);
        }
      });
  };
};
