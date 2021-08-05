import { FC, useEffect } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks"
import {
  SET_FORM_NAME,
  SET_FORM_EMAIL,
  SET_FORM_PASSWORD,
  UNSET_ERROR,
  register,
} from "../../services/actions/authorization-actions";
import styles from "./register-form.module.css";

const RegisterForm: FC = () => {
  const { formName, formEmail, formPassword, error, redirectToMain } = useSelector(
    (store) => store.authorizationReducer
  );
  const dispatch = useDispatch();
  
  useEffect(() => {
    return () => {
      dispatch({ type: UNSET_ERROR })
    }
  }, [dispatch])

  return (
    <>
      <h2 className="mt-20 mb-6 text text_type_main-medium">Регистрация</h2>
      {error && <h2 className="mb-6 text text_type_main-medium" style={{textAlign: "center"}}>{error}</h2>}
      <form className={`${styles.flexColumnCenter} mb-20`}>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            value={formName}
            onChange={(e) =>
              dispatch({
                type: SET_FORM_NAME,
                formName: e.target.value,
              })
            }
          />
        </div>
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
          onClick={() => {
            dispatch(register(formEmail, formPassword, formName));
          }}
        >
          Зарегистрироваться
        </Button>
      </form>
      <div>
        <div className={styles.displayFlex}>
          <p className={`${styles.text} text text_type_main-default`}>
            Уже зарегистрированы?
          </p>
          <Link to="/login">
            <p className={`${styles.link} text text_type_main-default`}>
              Войти
            </p>
          </Link>
        </div>
      </div>
      {redirectToMain && <Redirect to="/" />}
    </>
  );
};

export default RegisterForm;
