import React, { useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./personal-area-form.module.css";

const PersonalAreaForm = () => {
  const [isNameEdit, setNameEdit] = useState(false);
  const [isLoginEdit, setLoginEdit] = useState(false);
  const [isPasswordEdit, setPasswordEdit] = useState(false);
  const NameRef = React.useRef(null);
  const LoginRef = React.useRef(null);
  const PassRef = React.useRef(null);

  const onIconClick = (param) => () => {
    if (param === 'name') {
      !isNameEdit && NameRef.current.focus(); 
      setNameEdit(!isNameEdit); 
    }
    if (param === 'login') {
      !isLoginEdit && LoginRef.current.focus(); 
      setLoginEdit(!isLoginEdit);
    }
    if (param === 'password') {
      !isPasswordEdit && PassRef.current.focus();
      setPasswordEdit(!isPasswordEdit);
    }
  };
  return (
    <>
      <form className={`${styles.flexColumnCenter}`}>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            icon={isNameEdit ? "CloseIcon" : "EditIcon"}
            onIconClick={onIconClick('name')}
            ref={NameRef}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Логин"}
            icon={isLoginEdit ? "CloseIcon" : "EditIcon"}
            onIconClick={onIconClick('login')}
            ref={LoginRef}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"password"}
            placeholder={"Пароль"}
            icon={isPasswordEdit ? "CloseIcon" : "EditIcon"}
            onIconClick={onIconClick('password')}
            ref={PassRef}
          />
        </div>
      </form>
    </>
  );
};

export default PersonalAreaForm;
