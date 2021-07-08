import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./authentication-form.module.css";

const LoginForm = () => (
  <>
    <h2 className="mt-20 mb-6 text text_type_main-medium">Вход</h2>
    <form className={`${styles.flexColumnCenter} mb-20`}>
      <div className="mb-6">
        <EmailInput name={"email"} />
      </div>
      <div className="mb-6">
        <PasswordInput name={"password"} />
      </div>
      <Button type="primary" size="medium">
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
  </>
);

export default LoginForm;
