import {
  SET_FORM_NAME,
  SET_FORM_EMAIL,
  SET_FORM_PASSWORD,
  SET_USER,
  SET_REDIRECT_TO_MAIN,
  UNSET_REDIRECT_TO_MAIN,
  SET_LOGOUT,
} from "../../services/actions/authorization-actions";
import { SET_ERROR } from "../actions/app-actions";

const initialState = {
  error: null,
  formName: '',
  formEmail: '',
  formPassword: '',
  email: null,
  name: null,
  redirectToMain: false,
};

export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_NAME: {
      return {
        ...state,
        formName: action.formName,
      };
    }
    case SET_FORM_EMAIL: {
      return {
        ...state,
        formEmail: action.formEmail,
      };
    }
    case SET_FORM_PASSWORD: {
      return {
        ...state,
        formPassword: action.formPassword,
      };
    }
    case SET_USER: {
      return {
        ...state,
        email: action.user.email,
        name: action.user.name,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.error,
      }
    }
    case SET_REDIRECT_TO_MAIN: {
      return {
        ...state,
        redirectToMain: true,
      }
    }
    case UNSET_REDIRECT_TO_MAIN: {
      return {
        ...state,
        redirectToMain: false,
      }
    }
    case SET_LOGOUT: {
      return {
        ...initialState,
      }
    }
    default: {
      return state;
    }
  }
};
