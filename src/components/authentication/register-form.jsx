import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./authentication-form.module.css";

const RegisterForm = () => (
  <>
    <h2 className="mt-20 mb-6 text text_type_main-medium">Регистрация</h2>
    <form className={`${styles.flexColumnCenter} mb-20`}>
      <div className="mb-6">
        <Input type={"text"} placeholder={"Имя"} />
      </div>
      <div className="mb-6">
        <EmailInput name={"email"} />
      </div>
      <div className="mb-6">
        <PasswordInput name={"password"} />
      </div>
      <Button type="primary" size="medium">
        Зарегистрироваться
      </Button>
    </form>
    <div>
      <div className={styles.displayFlex}>
        <p className={`${styles.text} text text_type_main-default`}>Уже зарегистрированы?</p>
        <Link to="/login">
          <p className={`${styles.link} text text_type_main-default`}>Войти</p>
        </Link>
      </div>
    </div>
  </>
);

export default RegisterForm;
