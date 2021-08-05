import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";
import {
  SET_FORM_EMAIL,
  SET_FORM_PASSWORD,
  UNSET_ERROR,
  makeLogin,
} from "../../services/actions/authorization-actions";
import styles from "./login-form.module.css";
import { FC, useEffect } from "react";

const LoginForm: FC = () => {
  const { formEmail, formPassword, error, redirectToMain } = useSelector(
    (store) => store.authorizationReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: UNSET_ERROR });
    };
  }, [dispatch]);

  return (
    <>
      <h2 className="mt-20 mb-6 text text_type_main-medium">Вход</h2>
      {error && (
        <h2
          className="mb-6 text text_type_main-medium"
          style={{ textAlign: "center" }}
        >
          {error}
        </h2>
      )}
      <form className={`${styles.flexColumnCenter} mb-20`} onSubmit={(event) => {
            event.preventDefault();
            dispatch(makeLogin(formEmail, formPassword));
          }}>
        <div className="mb-6">
          <EmailInput
            name={"email"}
            value={formEmail}
            onChange={(e) =>
              dispatch({
                type: SET_FORM_EMAIL,
                formEmail: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            name={"password"}
            value={formPassword}
            onChange={(e) =>
              dispatch({
                type: SET_FORM_PASSWORD,
                formPassword: e.target.value,
              })
            }
          />
        </div>
        <Button
          type="primary"
          size="medium"
        >
          Войти
        </Button>
      </form>
      <div>
        <div className={styles.displayFlex}>
          <p className={`${styles.text} text text_type_main-default`}>
            Вы — новый пользователь?
          </p>
          <Link to="/register">
            <p className={`${styles.link} text text_type_main-default`}>
              Зарегистрироваться
            </p>
          </Link>
        </div>
        <div className={styles.displayFlex}>
          <p className={`${styles.text} text text_type_main-default`}>
            Забыли пароль?
          </p>
          <Link to="/forgot-password">
            <p className={`${styles.link} text text_type_main-default`}>
              Восстановить пароль
            </p>
          </Link>
        </div>
      </div>
      {redirectToMain && <Redirect to="/" />}
    </>
  );
};

export default LoginForm;
