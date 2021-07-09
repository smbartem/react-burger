import { setCookie, getCookie, deleteCookie } from "../utils";
const axios = require("axios");

const registerUrl = "https://norma.nomoreparties.space/api/auth/register"; //- эндпоинт для регистрации пользователя.
const authorizationUrl = "https://norma.nomoreparties.space/api/auth/login"; //- эндпоинт для авторизации.
const logoutUrl = "https://norma.nomoreparties.space/api/auth/logout"; //- эндпоинт для выхода из системы.
const tokenRefreshUrl = "https://norma.nomoreparties.space/api/auth/token"; //- эндпоинт обновления токена.

export const SET_FORM_NAME = "SET_FORM_NAME";
export const SET_FORM_EMAIL = "SET_FORM_EMAIL";
export const SET_FORM_PASSWORD = "SET_FORM_PASSWORD";
export const SET_USER = "SET_USER";
export const SET_ERROR = "SET_ERROR";
export const SET_REDIRECT_TO_MAIN = "SET_REDIRECT_TO_MAIN";
export const UNSET_REDIRECT_TO_MAIN = "UNSET_REDIRECT_TO_MAIN";
export const SET_LOGOUT = "SET_LOGOUT";

/*
  email: '008@ma.ru'
  password: '123456789' 
*/

const clearForm = (dispatch) => {
  dispatch({
    type: SET_FORM_NAME,
    formName: "",
  });
  dispatch({
    type: SET_FORM_EMAIL,
    formEmail: "",
  });
  dispatch({
    type: SET_FORM_PASSWORD,
    formPassword: "",
  });
};

const catchError = (dispatch, error) => {
  const errorDescription = error.response.data.message
    ? error.response.data.message
    : "Ошибка операции";
  dispatch({
    type: SET_ERROR,
    error: errorDescription,
  });
};

export const register = (email, password, name) => {
  return function (dispatch) {
    axios
      .post(registerUrl, {
        email,
        password,
        name,
      })
      .then((data) => {
        const accessToken = data.data.accessToken.split("Bearer ")[1];
        const refreshToken = data.data.refreshToken;
        setCookie("accessToken", accessToken, { expires: 1200 });
        setCookie("refreshToken", refreshToken);
        dispatch({ type: SET_REDIRECT_TO_MAIN });
        dispatch({
          type: SET_USER,
          user: data.data.user,
        });
        dispatch({ type: UNSET_REDIRECT_TO_MAIN });
      })
      .catch((error) => catchError(dispatch, error))
      .finally(() => clearForm(dispatch));
  };
};

export const makeLogin = (email, password) => {
  return function (dispatch) {
    axios
      .post(authorizationUrl, {
        email,
        password,
      })
      .then((data) => {
        const accessToken = data.data.accessToken.split("Bearer ")[1];
        const refreshToken = data.data.refreshToken;
        setCookie("accessToken", accessToken, { expires: 1200 });
        setCookie("refreshToken", refreshToken);
        dispatch({ type: SET_REDIRECT_TO_MAIN });
        dispatch({
          type: SET_USER,
          user: data.data.user,
        });
        dispatch({ type: UNSET_REDIRECT_TO_MAIN });
      })
      .catch((error) => catchError(dispatch, error))
      .finally(() => clearForm(dispatch));
  };
};

export const makeLogout = () => {
  return function (dispatch) {
    console.log();
    axios
      .post(logoutUrl, {
        token: `${getCookie("refreshToken")}`,
      })
      .then(() => {
        dispatch({ type: SET_LOGOUT });
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
      })
      .catch((error) => catchError(dispatch, error));
  };
};
