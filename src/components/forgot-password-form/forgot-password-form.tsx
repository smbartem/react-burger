import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import { Link, Redirect } from "react-router-dom";
import styles from "./forgot-password-form.module.css";
import {
  SET_FORM_EMAIL,
  restorePassword,
  UNSET_ERROR,
} from "../../services/actions/authorization-actions";
import { FC, useEffect } from "react";

const ForgotPasswordForm: FC = () => {
  const dispatch = useDispatch();
  const { formEmail, error, redirectToResetPassword } = useSelector(
    (store) => store.authorizationReducer
  );

  useEffect(() => {
    return () => {
      dispatch({ type: UNSET_ERROR });
    };
  }, [dispatch]);
  return (
    <>
      <h2 className="mt-20 mb-6 text text_type_main-medium">
        Восстановление пароля
      </h2>
      {error && (
        <h2
          className="mb-6 text text_type_main-medium"
          style={{ textAlign: "center" }}
        >
          {error}
        </h2>
      )}
      <form
        className={`${styles.flexColumnCenter} mb-20`}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(restorePassword(formEmail));
        }}
      >
        <div className="mb-6">
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            value={formEmail}
            onChange={(e) =>
              dispatch({
                type: SET_FORM_EMAIL,
                formEmail: e.target.value,
              })
            }
          />
        </div>
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <div>
        <div className={styles.displayFlex}>
          <p className={`${styles.text} text text_type_main-default`}>
            Вспомнили пароль?
          </p>
          <Link to="/login">
            <p className={`${styles.link} text text_type_main-default`}>
              Войти
            </p>
          </Link>
        </div>
      </div>
      {redirectToResetPassword && (
        <Redirect
          to={{
            pathname: "/reset-password",
            state: "forgot-password",
          }}
        />
      )}
    </>
  );
};

export default ForgotPasswordForm;
