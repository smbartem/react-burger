import React, { FC, useEffect, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./personal-area-form.module.css";
import { useDispatch, useSelector } from "../../services/hooks";
import {
  getUserData,
  changeUserData,
  SET_FORM_NAME,
  SET_FORM_EMAIL,
  SET_FORM_PASSWORD,
  UNSET_ERROR,
} from "../../services/actions/authorization-actions";

const PersonalAreaForm: FC = () => {
  const { formEmail, formName, formPassword } = useSelector(
    (store) => store.authorizationReducer
  );
  const dispatch = useDispatch();

  const [isNameEdit, setNameEdit] = useState(false);
  const [isLoginEdit, setLoginEdit] = useState(false);
  const [isPasswordEdit, setPasswordEdit] = useState(false);
  const [changeButtons, setChangeButtons] = useState(false);
  const NameRef = React.useRef<HTMLInputElement | null>(null);
  const LoginRef = React.useRef<HTMLInputElement | null>(null);
  const PassRef = React.useRef<HTMLInputElement | null>(null);

  const onIconClick = (param: string) => () => {
    if (param === "name") {
      !isNameEdit && NameRef.current?.focus();
      setNameEdit(!isNameEdit);
    }
    if (param === "login") {
      !isLoginEdit && LoginRef.current?.focus();
      setLoginEdit(!isLoginEdit);
    }
    if (param === "password") {
      !isPasswordEdit && PassRef.current?.focus();
      setPasswordEdit(!isPasswordEdit);
    }
    setChangeButtons(true);
  };

  useEffect(() => {
    dispatch(getUserData());
    return () => {
      dispatch({ type: UNSET_ERROR });
    };
  }, [dispatch]);

  return (
    <form
      className={`${styles.flexColumnCenter}`}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(changeUserData(formEmail, formPassword, formName));
      }}
    >
      <div className="mb-6">
        <Input
          type={"text"}
          placeholder={"Имя"}
          icon={isNameEdit ? "CloseIcon" : "EditIcon"}
          onIconClick={onIconClick("name")}
          ref={NameRef}
          onFocus={() => {
            setNameEdit(true);
            setChangeButtons(true);
          }}
          onBlur={() => setNameEdit(false)}
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
        <Input
          type={"text"}
          placeholder={"Логин"}
          icon={isLoginEdit ? "CloseIcon" : "EditIcon"}
          onIconClick={onIconClick("login")}
          ref={LoginRef}
          onFocus={() => {
            setLoginEdit(true);
            setChangeButtons(true);
          }}
          onBlur={() => setLoginEdit(false)}
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
        <Input
          type={isPasswordEdit ? "text" : "password"}
          placeholder={"Пароль"}
          icon={isPasswordEdit ? "CloseIcon" : "EditIcon"}
          onIconClick={onIconClick("password")}
          ref={PassRef}
          onFocus={() => {
            setPasswordEdit(true);
            setChangeButtons(true);
          }}
          onBlur={() => setPasswordEdit(false)}
          value={formPassword}
          onChange={(e) =>
            dispatch({
              type: SET_FORM_PASSWORD,
              formPassword: e.target.value,
            })
          }
        />
      </div>
      {changeButtons && (
        <div>
          <span
          className={styles.cancelButton}
            onClick={(e) => {
              e.preventDefault()
              dispatch(getUserData());
            }}
          >
            Отмена
          </span>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default PersonalAreaForm;
