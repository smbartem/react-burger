import React, { useState } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./authentication-form.module.css";

const ResetPasswordForm = () => {
  const [isPasswordShow, setPasswordShow] = useState(false);
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    inputRef.current.focus()
    setPasswordShow(!isPasswordShow)
  }
  return (
    <>
      <h2 className="mt-20 mb-6 text text_type_main-medium">Восстановление пароля</h2>
      <form className={`${styles.flexColumnCenter} mb-20`}>
        <div className="mb-6">
          <Input
            type={isPasswordShow ? "text" : "password"}
            placeholder={"Введите новый пароль"}
            icon={isPasswordShow ? "HideIcon" : "ShowIcon"}
            ref={inputRef}
            onIconClick={onIconClick}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
          />
        </div>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div>
        <div className={styles.displayFlex}>
          <p className={`${styles.text} text text_type_main-default`}>Вспомнили пароль?</p>
          <Link to="/login">
            <p className={`${styles.link} text text_type_main-default`}>Войти</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
