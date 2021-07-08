import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./authentication-form.module.css";

const ForgotPasswordForm = () => (
  <>
    <h2 className="mt-20 mb-6 text text_type_main-medium">
      Восстановление пароля
    </h2>
    <form className={`${styles.flexColumnCenter} mb-20`}>
      <div className="mb-6">
        <Input type={"email"} placeholder={"Укажите e-mail"} />
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
          <p className={`${styles.link} text text_type_main-default`}>Войти</p>
        </Link>
      </div>
    </div>
  </>
);

export default ForgotPasswordForm;
