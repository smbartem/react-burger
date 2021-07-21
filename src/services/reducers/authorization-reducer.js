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
} from "../../services/actions/authorization-actions";

const initialState = {
  error: null,
  formName: '',
  formEmail: '',
  formPassword: '',
  redirectToMain: false,
  redirectToResetPassword: false,
  redirectToLogin: false,
  redirectToLoginForOrder: false,
  formConfirmationCode: '',
  authorized: false,
  redirectToOrderDetails: false,
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
    case SET_LOGIN: {
      return {
        ...state,
        authorized: true
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
    case SET_REDIRECT_TO_RESET_PASSWORD: {
      return {
        ...state,
        redirectToResetPassword: true,
      }
    }
    case UNSET_REDIRECT_TO_RESET_PASSWORD: {
      return {
        ...state,
        redirectToResetPassword: false,
      }
    }
    case SET_REDIRECT_TO_LOGIN: {
      return {
        ...state,
        redirectToLogin: true
      }
    }
    case SET_REDIRECT_TO_LOGIN_FOR_ORDER: {
      return {
        ...state,
        redirectToLoginForOrder: true
      }
    }
    case UNSET_REDIRECT_TO_LOGIN_FOR_ORDER: {
      return {
        ...state,
        redirectToLoginForOrder: false
      }
    }
    case SET_REDIRECT_TO_ORDER_DETAILS: {
      return {
        ...state,
        redirectToOrderDetails: true
      }
    }
    case UNSET_REDIRECT_TO_ORDER_DETAILS: {
      return {
        ...state,
        redirectToOrderDetails: false
      }
    }
    case SET_CONFIRMATION_CODE: {
      return {
        ...state,
        formConfirmationCode: action.formConfirmationCode
      }
    }
    case UNSET_ERROR: {
      return {
        ...state,
        error: null,
      }
    }
    default: {
      return state;
    }
  }
};
